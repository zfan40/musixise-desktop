

import { app, BrowserWindow } from 'electron';

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
   //not '~/Library/Application/.....'   妈蛋
  BrowserWindow.addDevToolsExtension('/Users/ziwenfan/Library/Application\ Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/3.1.2_0');
  mainWindow = new BrowserWindow({
    minHeight: 600,
    minWidth: 600,
  });
  mainWindow.loadURL(winURL);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // eslint-disable-next-line no-console
  console.log('mainWindow opened');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
