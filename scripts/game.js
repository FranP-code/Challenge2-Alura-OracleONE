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

        hangmanDraw(array.length)

        //En el caso de que el usuario complete el hangman
        if (array.length >= 6) {

            const fatherElement = document.querySelector(".ahorcado")

            const element = document.createElement("p")
            element.textContent = "¡Fin del juego!"
            element.classList.add("end-game")
            element.classList.add("loses")

            fatherElement.appendChild(element)

            return "user loses"
        }
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
                //If not, add it to incorrect letters
                const message = addIncorrectLetter(e.key)

                if (message === "user loses") {
                    window.removeEventListener("keydown", registerKey)
                }
            }
        } else {
            console.log(false)
        }
    }
    window.addEventListener("keydown", registerKey)
}

function hangmanDraw(number) {
    const canvas = document.querySelector('.ahorcado canvas');
    const context = canvas.getContext("2d");
    
    context.strokeStyle = '#444';
    context.lineWidth = 10;
    context.beginPath();
    
    switch (number) {

        case 0:
            //Horca
            context.moveTo(500, 720);
            context.lineTo(33, 720);
            context.moveTo(268, 720);
            context.lineTo(268, 16);
            context.lineTo(670, 16);
            context.lineTo(670, 80);
            break;
        
        case 1:
            //Cabeza
            context.arc(670, 160, 80, 0, Math.PI*2, true);
            context.closePath();
            break;
        
        case 2:
            //Cuerpo
            context.moveTo(670, 240);
            context.lineTo(670, 448);
            break;
        
        case 3:
            //Pierna izquierda
            context.moveTo(670, 448);
            context.lineTo(536, 580);
            break;
        
        case 4:
            //Pierna derecha
            context.moveTo(670, 448);
            context.lineTo(810, 580);
            break;
        
        case 5:
            //Brazo izquierdo
            context.moveTo(670, 272);
            context.lineTo(500, 320);
            break;

        case 6:
            //Brazo derecho
            context.moveTo(670, 272);
            context.lineTo(830, 320);
            break;

        default:
            alert("ERROR")
            break;
    }

    context.stroke();
}

gameMain()