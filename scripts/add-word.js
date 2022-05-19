function addWordMain() {
    const input = document.querySelector("#add-word-input")
    const button = document.querySelector(".buttons-container button.main")

    function sendWord(e) {

        //En el caso de que se teclee una tecla en el input pero no sea un enter, retornar la funcion
        if (e.key) {
            if (e.key !== "Enter") {
                return
            }
        }
        const userInput = input.value.trim()
        const expresion = /^[a-zA-Z]+$/
        const validation = expresion.test(userInput)
        
        if (validation) {
            wordsList.addWord(input.value.trim())
            disableInput()
            wordsListMain()
            redirectUser()
        }

        messageToUser(validation)
    }

    button.addEventListener("click", sendWord)
    input.addEventListener("keydown", sendWord)

    function messageToUser(valid) {
        //Siendo valid un boolean
        const message = document.querySelector("main.add-word .message")

        //Eliminar clase
        if (message.classList.contains("valid")) {
            message.classList.remove("valid")
        }

        if (message.classList.contains("invalid")) {
            message.classList.remove("invalid")
        }

        message.classList.add(valid ? "valid" : "invalid") //Añadir nueva clase

        message.innerHTML = valid ?
            "<p>Palabra añadida con éxito<p><p>Volviendo en tres segundos<p>"
        :
            "<p>Palabra invalida</p>"
    }

    function disableInput() {
        const input = document.querySelector("#add-word-input")
        input.setAttribute("disabled", "true")
    }

    function redirectUser() {
        setTimeout(() => changeRoute("game"), 3000)
    }
}

function wordsListMain() {

    const element = document.querySelector("main.add-word .words-list")
    const fragment = document.createDocumentFragment()
    const listContainer = document.createElement("ul")

    //Por cada palabra, crear un elemento li con la palabra como texto
    wordsList.words.forEach(word => {
        const item = document.createElement("li")
        item.textContent = word
        listContainer.appendChild(item)
    })

    fragment.appendChild(listContainer)
    element.replaceChildren(fragment)
}