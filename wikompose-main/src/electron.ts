import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { ElectronRouterService } from './services/electron-router.service';

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    title: 'Wikompose',
    icon: path.join(app.getAppPath(), `/ui/favicon.ico`)
  });
  win.setMenu(null);

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(app.getAppPath(), `/ui/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  // Initializing router
  var electronRouterService = new ElectronRouterService(app, true);
  electronRouterService.init();

  // The following is optional and will open the DevTools:
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

// on macOS, closing the window doesn't quit the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// initialize the app's main window
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
