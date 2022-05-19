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

        //Checkear si todos los span tienen una letra en su interior

        let allLetersFilled = true

        const array = Array.from(letters.childNodes)
        const expresion = /^[a-zA-Z]+$/

        array.forEach(child => {
            //En el caso en el que el texto del elemento no sea una letra, cambiar la variable
            if(!expresion.test(child.textContent)) {
                allLetersFilled = false
            }
        })


        //En el caso de que el usuario gane...
        if (allLetersFilled) {
            endOfTheGame(true)
        }
    }

    function addIncorrectLetter(letter) {

        //Checkear que la letra no este en el elemento de letras incorrectas
        let letterAlreadyRegistered = false
        
        const array = Array.from(incorrectLetters.childNodes)

        array.forEach(child => {
            if (child.textContent === letter) {
                letterAlreadyRegistered = true
            }
        })

        //Si lo esta, retornar la funcion
        if (letterAlreadyRegistered) {
            return
        }

        //Si no, añadir la letra al elemento de letras incorrectas
        const element = document.createElement("span")
        element.textContent = letter

        incorrectLetters.appendChild(element)

        hangmanDraw(array.length)

        //En el caso de que el usuario complete el hangman, pierde
        if (array.length >= 6) {
            endOfTheGame(false)
        }
    }

    function endOfTheGame(victory) {
        //Siendo victory un boolean
        if (victory) {
            const fatherElement = document.querySelector(".ahorcado")

            const element = document.createElement("p")
            element.textContent = "¡Ganaste!"
            element.classList.add("end-game")
            element.classList.add("victory")

            fatherElement.appendChild(element)
        } else {
            const fatherElement = document.querySelector(".ahorcado")

            const element = document.createElement("p")
            element.textContent = "¡Fin del juego!"
            element.classList.add("end-game")
            element.classList.add("loses")

            fatherElement.appendChild(element)
        }
        window.removeEventListener("keydown", registerKey)
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

            //Normalize la tecla
            e.key = e.key.toLowerCase()

            //Si la tecla esta en la palabra, incluirla en el elemento de las letras
            if (word.includes(e.key)) {
                
                word.split("").forEach((letter, index) => {
                    if (letter === e.key) {
                        addCorrectLetter(e.key, index)
                    }
                })

            } else {
                //Si no lo esta, añadirlo a las letras incorrectas
                addIncorrectLetter(e.key)
            }
        } else {
            console.log(false)
        }
    }

    window.onkeydown = registerKey
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

function newGame() {
    const root = document.querySelector("#root")
    root.innerHTML = ""
    changeRoute("game")
}

gameMain()