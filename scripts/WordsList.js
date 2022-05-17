class WordsList {

    words = ["Perro", "Gato", "JavaScript", "HTML", "CSS", "Java", "Raton", "Alura", "Oracle"]

    addWord(string) {
        this.words.push(string)
    }

    getRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)]
    }
}