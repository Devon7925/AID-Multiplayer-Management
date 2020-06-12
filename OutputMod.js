
// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/AIDungeon/Scripting/blob/master/examples

const modifier = (text) => {
	function escapeRegex(string) {
		return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}

	let modifiedText = ""
	const shapesOfYou = ["you", "your", "yourself", "you're", "you'll", "you'd"]
	const punctuation = [".", ",", "!", "?", ":", ";"]
	const puncRegex = new RegExp("[" + escapeRegex(punctuation.join("")) + "]")
	const extPunctuation = [" ", ".", ",", "!", "?", ":", ";", "'", "\""]
	const extPuncRegex = new RegExp("[" + escapeRegex(extPunctuation.join("")) + "]")
	if (state.disableOut) {
		state.disableOut = false
	} else if (state.rules.get("disableYou")) {
		text = ". " + text
		let dialog = false
		let containsYou = false
		let index = 0
		let wordIndex = 0
		let sentenceIndex = 0
		for (char of text.split('')) {
			if (char === '\"') { dialog = !dialog }
			if (char === ' ') {
				if (!dialog &&
					shapesOfYou.includes(text.substring(wordIndex, index).toLowerCase().replace(extPuncRegex, ""))) containsYou = true
				wordIndex = index
			}
			if (char.match(puncRegex)) {
				if (!containsYou) modifiedText += text.substring(sentenceIndex + 1, index + 1)
				containsYou = false
				sentenceIndex = index
			}
			index++
		}
		if (text.substring(sentenceIndex, index).match(extPuncRegex)) {
			modifiedText += text.substring(sentenceIndex + 1, index)
		}
	} else {
		modifiedText = text
	}

	// You must return an object with the text property defined. 
	return { text: modifiedText }
}

// Don't modify this part
modifier(text)
