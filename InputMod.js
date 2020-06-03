
// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/AIDungeon/Scripting/blob/master/examples

const modifier = (text) => {

  if (!state.initialized) {
    state.step = 0
    state.initialized = true
  }
  let modifiedText = ""
  const lowered = text.toLowerCase()
  if (/[\s\n]+>/.test(text) || state.step <= 0) {
    modifiedText = text
  } else {
    state.disableOut = true
  }
  state.step++
  // You must return an object with the text property defined. 
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)
