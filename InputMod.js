
// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/AIDungeon/Scripting/blob/master/examples

const modifier = (text) => {
  
    let modifiedText = text
    const lowered = text.toLowerCase()
    
    // You must return an object with the text property defined. 
    return {text: modifiedText}
  }
  
  // Don't modify this part
  modifier(text)
  