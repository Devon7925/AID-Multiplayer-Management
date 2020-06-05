
// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/AIDungeon/Scripting/blob/master/examples

const modifier = (text) => {

	let modifiedText = ""
	let shapesOfYou = ["you", "your", "yourself", "you're", "you'll", "you'd"]
	let punctuation = [" ", ".", ",", "!", "?", ":", ";", "'", "\""]
	if (state.disableOut) {
		state.disableOut = false
	} else { 
		
		let dialog = false
		let preparedText = ""
		for (quote of text.split("\"")) {
			if (dialog) {
				quote = quote.replace(/\./g, "¤")
			}
			preparedText += quote + "\""
			dialog = !dialog
		}
		
		if (dialog) {
			preparedText = preparedText.slice(0, -1);
		}
		
		for (sentence of preparedText.split(".")) {
			let lower = sentence.toLowerCase()
			let dialog = false
			for (quote of lower.split("\"")) {
				if (dialog) {
					lower = lower.replace(quote, "")
				}
				dialog = !dialog
			}
			let containsYou = false
			for (youShape of shapesOfYou) {
				if (lower.endsWith(youShape)) {
					containsYou = true
				} else {
					for (symbol of punctuation) {
						if (lower.includes(" "+youShape+symbol)) {
							containsYou = true
						}
					}
				}
			}
			if (!containsYou && /\S/.test(lower)) {
				modifiedText += sentence + "."
				modifiedText = modifiedText.replace(/¤/g, ".")
			}
		} 
		
	}

  // You must return an object with the text property defined. 
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)
