import { FileManagementService } from '../services/file-management.service';
import { ConfigurationService } from '../services/configuration.service';
import { Controller, Route } from './router.decorators';
import { injectable } from 'inversify';

@injectable()
export class ConfigurationController implements Controller {

  constructor(
    private fileManagementService: FileManagementService,
    private configurationService: ConfigurationService
  ) {
  }

  @Route('/routes')
  public routes() {
    return this.fileManagementService.getFileTree();
  }

  @Route('/config')
  public config() {
    return this.configurationService.getConfiguration();
  }

  @Route('/settings/config')
  public configSettings() {
    return this.configurationService.getConfigurationWithMetadata();
  }

  @Route('/settings/config', 'POST')
  public updateConfigSettings(args: any) {
    return this.configurationService.updateConfiguration(args.body.property, args.body.value);
  }

}
