
// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/AIDungeon/Scripting/blob/master/examples

const modifier = (text) => {

  let modifiedText = ""

  if (state.disableOut) {
    state.disableOut = false
  } else { 
	for (sentence of text.split(".")) {
	  let lower = sentence.toLowerCase()
	  let dialog = false
	  for (quote of lower.split("\"")) {
		  if (dialog) {
			  lower = lower.replace(quote, "")
		  }
		  dialog = !dialog
	  }
	  if (!(lower.includes("you") || lower.includes("your")) && /\S/.test(lower)) {
		modifiedText += sentence + "."
	  }
	}
  }

  // You must return an object with the text property defined. 
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)
