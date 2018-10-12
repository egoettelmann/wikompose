import { ipcMain } from 'electron';
import { FileManagementService } from '../services/file-management.service';

class FileModel {
  path: string[];
  content: string;
}

export class FilesApiService {

  constructor(private fileManagementService: FileManagementService) {
  }

  public register() {
    this.registerFileRead();
    this.registerFileWrite();
  }

  private registerFileRead() {
    // Loading the content
    ipcMain.on('main:get//content', (event: any, filePath: any) => {
      const content = this.fileManagementService.getFileContent(filePath);
      const fileModel: FileModel = {
        path: filePath,
        content: content
      };
      event.sender.send('ui:get//content', fileModel);
    });
  }

  private registerFileWrite() {
    // Writing the content
    ipcMain.on('main:post//content', (event: any, arg: FileModel) => {
      this.fileManagementService.saveFileContent(arg.path, arg.content);
      event.sender.send('ui:post//content', {});
    });
  }
}
