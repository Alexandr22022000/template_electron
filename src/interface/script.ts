const { ipcRenderer, Event: eEvent } = require("electron");

const element = document.getElementById("text");
if (element) {
    ipcRenderer.on("message", (event: typeof eEvent, message: any) => {
        element.innerText = message;
    });
}

const button = document.getElementById("write"),
    textarea = document.getElementById("textarea");
if (button && textarea) {
    button.onclick = () => {
        //@ts-ignore
        ipcRenderer.send("saveFile", textarea.value);
    };
}

const buttonGo = document.getElementById("go");
if (buttonGo) {
    buttonGo.onclick = () => {
        ipcRenderer.send("goTo");
    };
}
