import { ipcMain } from 'electron';
import { FileManagementService } from '../services/file-management.service';
import { ConfigurationService } from '../services/configuration.service';

export class ConfigurationApiService {

  constructor(private fileManagementService: FileManagementService,
              private configurationService: ConfigurationService) {
  }

  public register() {
    this.registerRoutes();
    this.registerConfig();
    this.registerSettingsConfig();
    this.registerSettingsConfigUpdates();
  }

  private registerRoutes() {
    ipcMain.on('main:get//routes', (event: any, args: any) => {
      const files = this.fileManagementService.getFileTree();
      event.sender.send('ui:get//routes', files);
    });
  }

  private registerConfig() {
    ipcMain.on('main:get//config', (event: any, args: any) => {
      const configuration = this.configurationService.getConfiguration();
      event.sender.send('ui:get//config', configuration);
    });
  }

  private registerSettingsConfig() {
    ipcMain.on('main:get//settings/config', (event: any, args: any) => {
      const configuration = this.configurationService.getConfigurationWithMetadata();
      event.sender.send('ui:get//settings/config', configuration);
    });
  }

  private registerSettingsConfigUpdates() {
    ipcMain.on('main:post//settings/config', (event: any, args: any) => {
      const configuration = this.configurationService.setConfiguration(args.body.property, args.body.value);
      event.sender.send('ui:post//settings/config', configuration);
    });
  }

}
