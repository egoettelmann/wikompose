import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { FileManagementService } from './services/file-management.service';
import { ConfigurationApiService } from './api/configuration-api.service';
import { FilesApiService } from './api/files-api.service';

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

  // Instantiating services
  const fileManagementService = new FileManagementService('../wikompose-ui/src/assets/test/content');

  // Registering routes
  new ConfigurationApiService(fileManagementService).register();
  new FilesApiService(fileManagementService).register();

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
