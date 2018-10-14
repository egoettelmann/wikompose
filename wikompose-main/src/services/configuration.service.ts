import { ConfigurationProperties, ConfigurationPropertiesMetadata, ConfigurationPropertyMetadata } from '../models/configuration.model';
import * as fs from 'fs';

export class ConfigurationService {

  private static CONFIG_FILE_PATH = process.env.APPDATA + '/wikompose/.config';

  public getConfiguration(): ConfigurationProperties {
    const parsedConfig = this.getSavedConfiguration();
    const defaultConfig = new ConfigurationProperties();
    return Object.assign({}, defaultConfig, parsedConfig);
  }

  public getConfigurationWithMetadata(): ConfigurationPropertyMetadata[] {
    const properties = ConfigurationPropertiesMetadata.getInstance().getProperties();
    const currentConfiguration = this.getConfiguration() as any;
    properties.forEach(p => {
      if (currentConfiguration.hasOwnProperty(p.property)) {
        p.currentValue = currentConfiguration[p.property];
      }
    });
    return properties;
  }

  public setConfiguration(property: string, value: any) {
    const savedConfiguration = this.getSavedConfiguration() as any;
    savedConfiguration[property] = value;
    const stringifiedConfig = JSON.stringify(savedConfiguration);
    fs.writeFileSync(ConfigurationService.CONFIG_FILE_PATH, stringifiedConfig, 'utf8');
  }

  private getSavedConfiguration(): ConfigurationProperties {
    if (!fs.existsSync(ConfigurationService.CONFIG_FILE_PATH)) {
      fs.writeFileSync(ConfigurationService.CONFIG_FILE_PATH, '{}', { encoding: 'utf8', flag: 'w' });
    }
    const configAsString = fs.readFileSync(ConfigurationService.CONFIG_FILE_PATH, 'utf8');
    return JSON.parse(configAsString) as ConfigurationProperties;
  }

}
