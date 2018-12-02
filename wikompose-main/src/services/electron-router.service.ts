import { Express } from 'express';
import { App } from 'electron';
import { ConfigurationService } from './configuration.service';
import { FileManagementService } from './file-management.service';
import { ConfigurationApiService } from '../api/configuration-api.service';
import { FilesApiService } from '../api/files-api.service';

export class ElectronRouterService {

  constructor(
    private app: Express | App,
    private isElectronApp: boolean
  ) {
  }

  init() {
    // Instantiating services
    const configurationService = new ConfigurationService();
    const contentPath = configurationService.getConfiguration().contentPath;
    const fileManagementService = new FileManagementService(contentPath);

    // Registering routes
    new ConfigurationApiService(fileManagementService, configurationService).register();
    new FilesApiService(fileManagementService).register();

    console.log('Init finished');
  }

}
