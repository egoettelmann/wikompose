import { ipcMain } from 'electron';
import { FileManagementService } from '../services/file-management.service';

export class ConfigurationApiService {

  constructor(private fileManagementService: FileManagementService) {
  }

  public register() {
    this.registerAvailableRoutes();
  }

  private registerAvailableRoutes() {
    ipcMain.on('main:get//routes', (event: any, arg: any) => {
      const files = this.fileManagementService.getFileTree();
      event.sender.send('ui:get//routes', files);
    });
  }

}
