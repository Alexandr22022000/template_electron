const { BrowserWindow } = require("electron");

interface IStore {
    port: number|null,
    mainWindow: typeof BrowserWindow
}

const store: IStore = {
    port: null,
    mainWindow: null,
};

export default store;
