class Timer {
    constructor() {
        this.responseActionDiv = document.getElementById("responseActionDiv");
        this.timerId = null;
        this.blockedButtons = document.querySelectorAll(".button");
    }

    SetDefaultText() {
        this.blockedButtons.forEach(button => {
            button.disabled = true;
            button.classList.add("btnBlocked");
        });

        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        this.timerId = setTimeout(() => {
            this.responseActionDiv.innerText = "Witaj w aplikacji WordMaster";

            this.blockedButtons.forEach(button => {
                button.disabled = false;
                button.classList.remove("btnBlocked");
            });
        }, 1000);
    }
}

let timer = new Timer();
