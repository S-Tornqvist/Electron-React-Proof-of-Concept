import { app, BrowserWindow, shell } from 'electron';
import * as path from 'path';
import './ipcSetup';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  // Redirect navigation to preferred handler.
  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    void shell.openExternal(url);
    console.log('Redirected navigation to preferred shell handler: ' + url);
  });

  // Redirect new window to preferred handler.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    console.log('Redirected new window to preferred shell handler: ' + url);
    void shell.openExternal(url);
    return { action: 'deny' };
  });

  if (process.env.NODE_ENV === 'development') {
    void mainWindow.loadURL('http://localhost:3000');
  } else {
    void mainWindow.loadFile(path.join(__dirname, '/renderer/index.html'));
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
