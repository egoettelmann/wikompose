import { ipcMain } from 'electron';
import { FileManagementService } from '../services/file-management.service';

export class FilesApiService {

  constructor(private fileManagementService: FileManagementService) {
  }

  public register() {
    this.registerFileRead();
    this.registerFileWrite();
  }

  private registerFileRead() {
    // Loading the content
    ipcMain.on('main:get//content', (event: any, arg: any) => {
      const content = this.fileManagementService.getFileContent(arg);
      event.sender.send('ui:get//content', content);
    });
  }

  private registerFileWrite() {
    // Writing the content
    ipcMain.on('main:post//content', (event: any, arg: any) => {
      const content = this.fileManagementService.saveFileContent(arg.filePath, arg.fileContent);
      event.sender.send('ui:post//content', content);
    });
  }
}
