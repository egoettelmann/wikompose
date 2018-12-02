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
    ipcMain.on('main:get//content', (event: any, args: any) => {
      const content = this.fileManagementService.getFileContent(args.queryParams.path);
      const fileModel: FileModel = {
        path: args.queryParams.path,
        content: content
      };
      event.sender.send('ui:get//content', fileModel);
    });
  }

  private registerFileWrite() {
    // Writing the content
    ipcMain.on('main:post//content', (event: any, args: any) => {
      this.fileManagementService.saveFileContent(args.queryParams.path, args.body);
      event.sender.send('ui:post//content', {});
    });
  }
}
