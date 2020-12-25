const { app, BrowserWindow, dialog, ipcMain, Event } = require("electron");
import isDev from 'electron-is-dev';
import server from "./server";
import fs from 'fs';
import path from "path";
import store from './store';

server();

ipcMain.on("saveFile", async (event: typeof Event, message: any) => {
    const result = await dialog.showSaveDialog({properties: ['createDirectory', 'treatPackageAsDirectory']});
    if (result.canceled) return;

    fs.writeFile(result.filePath, message, (e: any) => {
        if (e) return store.mainWindow.webContents.send("message", "Save file error!");
        store.mainWindow.webContents.send("message", "File was saved!");
    });

});

ipcMain.on("goTo", async (event: typeof Event, message: any) => {
    if (isDev) {
        store.mainWindow.loadURL('http://localhost:3000');
    }
    else {
        store.mainWindow.loadURL('http://localhost:' + store.port);
    }
});

app.on("ready", () => {
    store.mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegrationInWorker: true,
            nodeIntegration: true,
        },
    });

    store.mainWindow.loadURL("file://" + path.join(__dirname, "./interface/index.html"));

    store.mainWindow.once("ready-to-show", () => store.mainWindow.show());
    store.mainWindow.on("closed", () => {});

    store.mainWindow.webContents.on("did-finish-load", () => {
        store.mainWindow.webContents.send("message", "Ready!");
    });
});
