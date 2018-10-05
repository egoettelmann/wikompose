import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { FileManagementService } from './services/file-management.service';

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

  // Loading the files
  ipcMain.on('main/routes', function (event: any, arg: any) {
    const files = FileManagementService.getFileTree();
    console.log(arg, JSON.stringify(files));
    event.sender.send('ui/routes', files);
  });

  // Loading the content
  ipcMain.on('main/content', function (event: any, arg: any) {
    const content = FileManagementService.getFileContent(arg);
    event.sender.send('ui/content', content);
  });

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
