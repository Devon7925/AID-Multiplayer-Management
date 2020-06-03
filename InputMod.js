
// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/AIDungeon/Scripting/blob/master/examples

const modifier = (text) => {

  if (!state.initialized) {
    state.step = 0
    state.initialized = true
    state.players = []
  }
  
  if(state.step === 0){
    state.pin = Math.floor( Math.random() * 10000 )
    state.message = state.pin.toString()
  }else{
    state.message = ""
  }
  
  let modifiedText = ""
  const lowered = text.toLowerCase()
  if (/^[\s\n]+>\s/.test(text) || state.step <= 0) {
    modifiedText = text
    charName = text.replace(/^[\s\n]+>\s/, "").match(/\w+\s/)[0]
    if(!state.players.includes(charName)){
      state.players.push(charName)
      state.message += charName + "has Joined the Game"
    }
  } else {
    state.disableOut = true
  }
  
  state.step++
  // You must return an object with the text property defined.
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)
