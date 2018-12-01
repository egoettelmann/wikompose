import { ConfigurationProperties, ConfigurationPropertiesMetadata, ConfigurationPropertyMetadata } from '../models/configuration.model';
import * as fs from 'fs';

export class ConfigurationService {

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
    fs.writeFileSync(this.getConfigurationFilePath(), stringifiedConfig, 'utf8');
  }

  private getSavedConfiguration(): ConfigurationProperties {
    if (!fs.existsSync(this.getConfigurationFilePath())) {
      fs.mkdirSync(this.getConfigurationFolderPath());
      fs.writeFileSync(this.getConfigurationFilePath(), '{}', { encoding: 'utf8', flag: 'w' });
    }
    const configAsString = fs.readFileSync(this.getConfigurationFilePath(), 'utf8');
    return JSON.parse(configAsString) as ConfigurationProperties;
  }

  private getConfigurationFilePath() {
    return this.getConfigurationFolderPath() + '/.config';
  }

  private getConfigurationFolderPath() {
    let filePath: string;
    if (process.platform === 'darwin') {
      filePath = process.env.HOME;
    } else {
      filePath = process.env.APPDATA;
    }
    return filePath + '/wikompose';
  }

}
