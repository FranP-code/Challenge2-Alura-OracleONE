function gameMain() {
    //Letters append on main element
    const letters = document.querySelector("div.letters")
    const incorrectLetters = document.querySelector("div.incorrect-letters")
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

    function addIncorrectLetter(letter) {
        
        //Check if the letter isn't on the incorrect letters's element
        let letterAlreadyRegistered = false
        
        const array = Array.from(incorrectLetters.childNodes)
        array.forEach(child => {
            if (child.textContent === letter) {
                letterAlreadyRegistered = true
            }
        })

        //If it is on, return the function
        if (letterAlreadyRegistered) {
            return
        }

        //Else, add it to the incorrect letters element
        const element = document.createElement("span")
        element.textContent = letter

        incorrectLetters.appendChild(element)
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

            } else {
                //If not, check if it is on incorrect letters and add it to incorrect letters


                addIncorrectLetter(e.key)
            }
        } else {
            console.log(false)
        }
    }
    window.addEventListener("keydown", registerKey)
}

gameMain()