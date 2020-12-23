const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express'),
    server = express();

server.get('/*', (req, res) => {
    res.send('ok').status(200);
});

server.listen(5000);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        show: false
    });

    mainWindow.loadURL('file://' + path.join(__dirname, './build/index.html'));

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
app.on('ready', createWindow);
