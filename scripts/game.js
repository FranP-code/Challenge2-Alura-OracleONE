function gameMain() {
    //Letters append on main element
    const letters = document.querySelector("div.letters")
    const fragment = document.createDocumentFragment()

    const wordsList = new WordsList()
    const word = wordsList.getRandomWord()
        
    word.split("").forEach(letter => {
        const element = document.createElement('span')
        element.classList.add("letter")
        element.textContent = letter

        fragment.appendChild(element)
    })

    letters.append(fragment)

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
            console.log(true)
        } else {
            console.log(false)
        }
    }
    window.addEventListener("keydown", registerKey)
}

gameMain()