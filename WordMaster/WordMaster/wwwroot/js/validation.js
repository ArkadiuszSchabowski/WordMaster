class Validation {
    constructor() {
        this.responseActionDiv = document.getElementById("responseActionDiv");
        this.containsNumbers = /\d/;
    }

    DisplayError(message, inputElement) {
        this.responseActionDiv.innerText = message;
        buttons.ClearFields();
        timer.SetDefaultText();
        inputElement.focus();
    }

    ValidationId(id) {
        if (id === "") {
            this.DisplayError("Wpisz proszę Id słowa!", buttons.idInput);
            return false;
        }

        if (isNaN(id)) {
            this.DisplayError("Wartość Id musi być liczbą!", buttons.idInput);
            return false;
        }

        return true;
    }

    ValidationWords(plWord, engWord) {
        if (plWord == "" && engWord == "") {
            this.DisplayError("Wprowadź polskie słowo i jego angielski odpowiednik!", buttons.polishWordInput);
            return false;
        }

        if (plWord == "") {
            this.DisplayError("Nie wpisano słowa po polsku!", buttons.polishWordInput);
            return false;
        }

        if (engWord == "") {
            this.DisplayError("Nie wpisano słowa po angielsku!", buttons.englishWordInput);
            return false;
        }

        if (this.containsNumbers.test(plWord) || this.containsNumbers.test(engWord)) {
            this.DisplayError("Wartości zawierające cyfry są niedozwolone!", buttons.polishWordInput);
            return false;
        }

        return true;
    }
}

let validation = new Validation();