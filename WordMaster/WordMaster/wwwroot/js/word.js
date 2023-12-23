class Word {
    constructor() {

        this.host = "https://localhost:5000";
        this.isFirstRun = true;

        this.plWordsDiv = document.getElementById("plWordsDiv");
        this.engWordsDiv = document.getElementById("engWordsDiv");

        this.countWordsDiv = document.getElementById("countWords");
        this.counter = 0;

        this.loadingOverlay = document.getElementById("loadingOverlay");
    }
    async Init() {
        if (this.isFirstRun) {
            loadingOverlay.style.display = "flex";
            this.isFirstRun = false;
        }

        let path = `${this.host}/api/word/`;
        let response = await fetch(path);
        let data = await response.json();
        this.CreateDiv(data.data);

        this.loadingOverlay.style.display = "none";
    }
    CreateDiv(data) {
        for (let i = 0; i < data.length; i++) {
            let plDiv = document.createElement("div");
            let engDiv = document.createElement("div");

            plDiv.className = "plClass";
            engDiv.className = "engClass";

            plDiv.textContent = `Id:${data[i].id} - ${data[i].polishWord}`;
            engDiv.textContent = `Id: ${data[i].id} - ${data[i].englishWord}`;

            plDiv.id = `plDiv${i}`;
            engDiv.id = `engDiv${i}`;

            this.plWordsDiv.appendChild(plDiv);
            this.engWordsDiv.appendChild(engDiv);
        }
        this.CountWords(data);
    }
    CountWords(data) {
        this.counter = data.length;
        this.countWordsDiv.innerHTML = `Licznik słów: ${this.counter}`;
    }
}
let word = new Word();
word.Init();