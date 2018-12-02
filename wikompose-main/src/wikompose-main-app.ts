import "reflect-metadata";
import { InversifyContainer } from './inversify.config';
import { Express } from 'express';
import { App } from 'electron';
import { ConfigurationService } from './services/configuration.service';
import { FileManagementService } from './services/file-management.service';
import { ConfigurationApiService } from './api/configuration-api.service';
import { FilesApiService } from './api/files-api.service';

export class WikomposeMainApp {

  constructor(
    private app: Express | App,
    private isElectronApp: boolean
  ) {
  }

  init() {
    // Instantiating services
    const configurationService = InversifyContainer.get<ConfigurationService>(ConfigurationService);
    const fileManagementService = InversifyContainer.get<FileManagementService>(FileManagementService);

    // Registering routes
    console.log('Registering controllers for', this.isElectronApp ? 'Electron' : 'Express');
    new ConfigurationApiService(fileManagementService, configurationService).register();
    new FilesApiService(fileManagementService).register();

    console.log('Main app init finished');
  }

}
