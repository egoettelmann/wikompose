import { ConfigurationProperties, ConfigurationPropertiesMetadata, ConfigurationPropertyMetadata } from '../models/configuration.model';
import * as fs from 'fs';
import { injectable } from 'inversify';

@injectable()
export class ConfigurationService {

  private static readonly APP_FOLDER = '/wikompose';

  private static readonly CONFIG_FILENAME = '/.config';

  private configurationProperties: ConfigurationProperties;

  /**
   * Gets the configuration properties of the application.
   */
  public getConfiguration(): ConfigurationProperties {
    if (!this.configurationProperties) {
      this.reloadConfigurationProperties();
    }
    return this.configurationProperties;
  }

  /**
   * Gets the configurable properties with their metadata (to generate the form).
   */
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

  /**
   * Updates an existing configuration property.
   *
   * @param property the property to update
   * @param value the new value
   */
  public updateConfiguration(property: string, value: any) {
    const savedConfiguration = this.getSavedConfiguration() as any;
    savedConfiguration[property] = value;
    const stringifiedConfig = JSON.stringify(savedConfiguration);
    fs.writeFileSync(this.getConfigurationFilePath(), stringifiedConfig, 'utf8');
    this.reloadConfigurationProperties();
  }

  /**
   * Reloads the configuration properties in memory
   */
  private reloadConfigurationProperties(): void {
    const parsedConfig = this.getSavedConfiguration();
    const defaultConfig = new ConfigurationProperties();
    this.configurationProperties = Object.assign({}, defaultConfig, parsedConfig);
  }

  /**
   * Gets the saved configuration of a user.
   */
  private getSavedConfiguration(): ConfigurationProperties {
    if (!fs.existsSync(this.getConfigurationFilePath())) {
      if (!fs.existsSync(this.getConfigurationFolderPath())) {
        fs.mkdirSync(this.getConfigurationFolderPath());
      }
      fs.writeFileSync(this.getConfigurationFilePath(), '{}', { encoding: 'utf8', flag: 'w' });
    }
    const configAsString = fs.readFileSync(this.getConfigurationFilePath(), 'utf8');
    return JSON.parse(configAsString) as ConfigurationProperties;
  }

  /**
   * Gets the full path to the saved configuration file.
   */
  private getConfigurationFilePath() {
    return this.getConfigurationFolderPath() + ConfigurationService.CONFIG_FILENAME;
  }

  /**
   * Gets the full path to the saved configuration folder.
   */
  private getConfigurationFolderPath() {
    let filePath: string;
    if (process.platform === 'darwin') {
      filePath = process.env.HOME;
    } else {
      filePath = process.env.APPDATA;
    }
    return filePath + ConfigurationService.APP_FOLDER;
  }

}
