function changeRoute(route) {
    const root = document.querySelector('#root')
    
    const mainElement = document.createElement("main")
    mainElement.classList.add(route)
    
    switch (route) {
        case "base": 
            mainElement.innerHTML = `
                <button onclick="changeRoute('game')" class="main">Iniciar juego</button>
                <button onclick="changeRoute('add-word')">Agregar nueva palabra</button>
            `
            break;
        
        case "add-word": 
            mainElement.innerHTML = `
                <textarea id="add-word-input" type="text" maxlength="8" placeholder="Ingrese la nueva palabra aquí"></textarea>
                <div class="warning">
                    <img src="/img/warning.svg" alt="warning">
                    Max. 8 carácteres
                </div>
                <div class="buttons-container">
                    <button class="main">Guardar y empezar</button>        
                    <button onclick="changeRoute('base')">Cancelar</button>        
                </div>
                `
            break

        case "game":
            mainElement.innerHTML = `
                <div class="ahorcado"></div>
                <div class="letters"></div>
                <button class="main">Nuevo juego</button>
                <button onclick="changeRoute('base')">Desistir</button>
            `
            break;
    
        default:
            alert("RUTA NO DEFINIDA")
            break;
    }
    
    root.replaceChildren(mainElement)
}