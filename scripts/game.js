function gameMain() {
    //Letters append on main element
    const letters = document.querySelector("div.letters")
    const fragment = document.createDocumentFragment()

    const wordsList = new WordsList()
    const word = wordsList.getRandomWord().toLowerCase()
        
    word.split("").forEach(() => {
        const element = document.createElement('span')
        element.classList.add("letter")
        element.innerHTML = "<span class='empty'></span>"

        fragment.appendChild(element)
    })

    letters.append(fragment)

    function addCorrectLetter(letter, position) {
        letters.children[position].textContent = letter
    }

    //Keyboard press event
    function registerKey(e) {

        //Checkear que si no se esta en el juego, eliminar el EventListener
        const main = document.querySelector("main")

        if (!main.classList.contains("game")) {
            window.removeEventListener("keydown", registerKey)
            return
        }

        const expresion = /^[a-zA-Z]+$/

        if (expresion.test(e.key) && e.key.length === 1) {

            //Normalize key
            e.key = e.key.toLowerCase()

            //If key is on word, append it
            if (word.includes(e.key)) {
                
                word.split("").forEach((letter, index) => {
                    if (letter === e.key) {
                        addCorrectLetter(e.key, index)
                    }
                })

            }
        } else {
            console.log(false)
        }
    }
    window.addEventListener("keydown", registerKey)
}

gameMain()