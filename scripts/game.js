const letters = document.querySelector("div.letters")
const fragment = document.createDocumentFragment()

const word = "TEstingA"
    
word.split("").forEach(letter => {
    const element = document.createElement('span')
    element.classList.add("letter")
    element.textContent = letter

    fragment.appendChild(element)
})

letters.append(fragment)