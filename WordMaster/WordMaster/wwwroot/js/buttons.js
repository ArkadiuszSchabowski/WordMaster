class Buttons {
    constructor() {
        this.host = "https://localhost:5000";

        this.btnAdd = document.getElementById("btnAdd");
        this.btnUpdate = document.getElementById("btnUpdate");
        this.btnClear = document.getElementById("btnClear");
        this.btnSearch = document.getElementById("btnSearch");
        this.btnDisplay = document.getElementById("btnDisplay");
        this.btnDelete = document.getElementById("btnDelete");

        this.idInput = document.getElementById("idInput");
        this.polishWordInput = document.getElementById("polishWordInput");
        this.englishWordInput = document.getElementById("englishWordInput");

        this.plWordsDiv = document.getElementById("plWordsDiv");
        this.engWordsDiv = document.getElementById("engWordsDiv");

        this.responseActionDiv = document.getElementById("responseActionDiv");

        this.isWordsVisible = false;
        this.isWordSearched = null;
    }

    ButtonsActive() {
        this.BtnDisplay();
        this.BtnClear();
        this.BtnUpdate();
        this.BtnSearch();
        this.BtnAdd();
        this.BtnDelete();
    }
    BtnDisplay() {
        this.btnDisplay.addEventListener("click", async () => {

            if (this.isWordSearched == true) {
                this.ClearList();
                word.Init();
                this.isWordSearched = false;
                return;
            }

            if (this.isWordsVisible) {
                await word.Init();
                this.isWordsVisible = false;
                return;
            }

            if (!this.isWordsVisible) {
                this.ClearList();
                this.isWordsVisible = true;
                return;
            }
            this.polishWordInput.focus();
        });
    }

    BtnClear() {
        this.btnClear.addEventListener("click", () => {

            this.ClearList();
            this.ClearFields();
            this.polishWordInput.focus();

            word.Init();
        });
    }

    BtnUpdate() {
        this.btnUpdate.addEventListener("click", async () => {
            try {
                this.ClearList();

                let id = this.idInput.value;

                if (!validation.ValidationId(id)) {
                    word.Init();
                    return;
                };

                let plWord = this.polishWordInput.value;
                let engWord = this.englishWordInput.value;

                if (!validation.ValidationWords(plWord, engWord)) {
                    word.Init();
                    return;
                }

                let path = `${this.host}/api/word/${id}`;
                let dataBody = {
                    polishWord: plWord,
                    englishWord: engWord
                };

                let response = await fetch(path, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataBody)
                });

                let data = await response.json();

                this.responseActionDiv.innerText = data.message;

                timer.SetDefaultText();
                word.Init();

                if (response.ok) {
                    this.ClearFields();
                    return;
                }
                return;
            }

            catch (error) {
                console.log(error);
            }
        })
    }

    BtnDelete() {

        this.btnDelete.addEventListener("click", async () => {

            try {
                this.ClearList();

                let id = this.idInput.value;

                if (!validation.ValidationId(id)) {
                    word.Init();
                    this.ClearFields();
                    return;
                };

                let path = `${this.host}/api/word/${id}`;
                let response = await fetch(path, {
                    method: "DELETE"
                });
                let data = await response.json();

                word.Init();
                this.idInput.focus();

                this.responseActionDiv.innerText = data.message;
                timer.SetDefaultText();
                this.ClearFields();
            } catch (error) {
                console.log(error)
            }
        })
    }
    BtnAdd() {
        this.btnAdd.addEventListener("click", async () => {

            try {
                this.ClearList();
                this.idInput.value = "";

                let plWord = this.polishWordInput.value;
                let engWord = this.englishWordInput.value;

                if (!validation.ValidationWords(plWord, engWord)) {
                    word.Init();
                    return;
                }

                let path = `${this.host}/api/word/`;
                let dataBody = {
                    polishWord: plWord,
                    englishWord: engWord
                };

                let response = await fetch(path, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataBody)
                });

                let data = await response.json();

                word.Init();
                this.polishWordInput.focus();

                this.responseActionDiv.innerText = data.message;

                timer.SetDefaultText();
                if (response.ok) {
                this.ClearFields();
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }

    BtnSearch() {

        this.btnSearch.addEventListener("click", () => {


            let id = this.idInput.value;

            this.ClearList();

            if (!validation.ValidationId(id)) {
                word.Init();
                this.ClearFields();
                return;
            };

            this.GetWord(id);
        });
    };
    async GetWord(id) {
        try {
            let path = `${this.host}/api/word/${id}`;
            let response = await fetch(path);
            let data = await response.json();

            this.responseActionDiv.innerText = data.message;

            if (data.data === null) {
                word.Init();
                this.ClearFields();
                return;
            }
            this.isWordSearched = true;

            this.SetWord(data.data);

            this.idInput.focus();

            timer.SetDefaultText();
        }

        catch (e) {
            console.log(error);
        }
    }
    SetWord(data) {

        this.polishWordInput.value = data.polishWord;
        this.englishWordInput.value = data.englishWord;

        let plDiv = document.createElement("div");
        let engDiv = document.createElement("div");

        plDiv.className = "plClass";
        engDiv.className = "engClass";

        plDiv.textContent = `Id:${data.id} - ${data.polishWord}`;
        engDiv.textContent = `Id: ${data.id} - ${data.englishWord}`;

        this.ClearList();

        word.plWordsDiv.appendChild(plDiv);
        word.engWordsDiv.appendChild(engDiv);
    }
    ClearFields() {
        this.idInput.value = "";
        this.polishWordInput.value = "";
        this.englishWordInput.value = "";
    }
    ClearList() {
        this.plWordsDiv.innerHTML = "";
        this.engWordsDiv.innerHTML = "";
    }
};

let buttons = new Buttons();
buttons.ButtonsActive();