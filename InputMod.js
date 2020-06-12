// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/AIDungeon/Scripting/blob/master/examples



const modifier = (text) => {
	class MyMap {
		constructor() {
			this.keys = []
			this.entries = []
		}
		static copy(map) {
			let mapCopy = new MyMap()
			for (let i = 0; i < map.keys.length; i++) {
				mapCopy.set(map.keys[i], map.entries[i])
			}
			return mapCopy
		}
		set(key, entry) {
			if (this.keys.includes(key)) {
				this.entries[this.keys.indexOf(key)] = entry
			} else {
				this.keys.push(key)
				this.entries.push(entry)
			}
		}

		get(key) {
			if (this.keys.includes(key)) return this.entries[this.keys.indexOf(key)]
			else throw 'entry does not exist!'
		}
	}

	const rule = function (args) {
		argSet = args.split(/\s/)
		if (argSet.length == 1) {
			state.message += argSet[0] + " is " + (state.rules.get(argSet[0]) ? "enabled" : "disabled")
		} else {
			if (argSet[1] === "enable") state.rules.set(argSet[0], true)
			else if (argSet[1] === "disable") state.rules.set(argSet[0], false)
			else state.message += "could not understand command"
		}
	}

	const statePrint = function (args) {
		state.message += state.rules.get("usePin") ? JSON.stringify(state) : "usePin is required to get state"
	}

	const ban = function (args) {
		getPlayer(args)[2] = !getPlayer(args)[2]
	}

	const op = function (args) {
		getPlayer(args)[1] = !getPlayer(args)[1]
	}

	let commands = new MyMap()
	commands.set('rule', rule)
	commands.set('state', statePrint)
	commands.set('ban', ban)
	commands.set('op', op)

	if (!state.initialized) {
		state.step = 0
		state.turn = 0
		state.initialized = true
		state.players = []//format is array of arrays ["name", bool hasPerms, bool banned]
		state.rules = new MyMap()
		state.rules.set("usePin", false)
		state.rules.set("useTurns", false)
		state.rules.set("disableYou", true)
		state.rules.set("disableStory", false)
	}

	const playersIncludes = function (playerName) {
		for (player of state.players) {
			if (player[0] === playerName) {
				return true
			}
		}
		return false
	}

	const getPlayer = function (playerName) {
		for (player of state.players) {
			if (player[0] === playerName) {
				return player
			}
		}
		return null
	}

	state.rules = MyMap.copy(state.rules)

	if (state.step === 0) {
		state.pin = Math.floor(Math.random() * 10000)
		state.message = state.pin.toString()
	} else {
		state.message = ""
	}

	text = text.replace(/\./, "")

	let modifiedText = ""
	if (/^[\s\n]*>\s/.test(text) || state.step <= 0) {
		let useText = true
		if (state.step > 0) {
			let charName = text.replace(/^[\s\n]*>\s/, "").match(/\w+\s/)[0].replace(/\s+/, "")
			if (!playersIncludes(charName)) {
				state.players.push([charName, state.players.length == 0, false])
				state.message += charName + " has Joined the Game"
			}
			if (getPlayer(charName)[1]) {
				let allowed = true
				if (state.rules.get("usePin")) {
					if (Number(text.match(/\d+/)[0]) === state.pin) {
						text = text.replace(/.+\d+\s+/, "")
					} else {
						state.message += "You must use the correct Pin"
						allowed = false
						useText = false
					}
				}
				if (allowed && /-/.test(text)) {
					let command = text.replace(/.*-/, "").trim()
					let splitCommand = command.split(/\s+/)
					let args = splitCommand.slice(1, splitCommand.length).join(" ")
					let func = commands.get(splitCommand[0])
					func(args)
					useText = false
				}
			}
			if (state.rules.get("useTurns") && state.players.length > 0) {
				if (charName !== state.players[state.turn][0]) {
					useText = false
				}
			}
		}
		if (useText) modifiedText = text
		else state.disableOut = true
	} else if (!state.rules.get("disableStory")) {
		modifiedText = text
	} else {
		state.disableOut = true
	}
	if (!state.disableOut && state.rules.get("useTurns")) {
		if (state.players.length > 0) {
			state.turn++
			state.turn = state.turn % state.players.length
			while (state.players[state.turn][2]) {
				state.turn++
				state.turn = state.turn % state.players.length
			}
			state.message += "It is now " + state.players[state.turn][0] + "'s turn"
		}
	}
	state.step++
	// You must return an object with the text property defined.
	return { text: modifiedText }
}

// Don't modify this part
modifier(text)