
// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/AIDungeon/Scripting/blob/master/examples

const modifier = (text) => {
  
    let modifiedText = ""
    
    for(sentence of text.split(".")){
        let lower = sentence.toLowerCase()
        if(!(lower.includes("you")||lower.includes("your")) && /\S/.test(lower)){
            modifiedText += sentence + "."
        }
    }
    
    // You must return an object with the text property defined. 
    return {text: modifiedText}
  }
  
  // Don't modify this part
  modifier(text)
  