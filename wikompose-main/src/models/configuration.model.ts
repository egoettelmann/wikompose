function Property(type: string, description = '') {

  return function(target: any, key: string) {
    const defaultValue = new target['constructor']();
    ConfigurationPropertiesMetadata.getInstance().register(
      key,
      type,
      description,
      defaultValue[key]
    );
  };
}

export interface ConfigurationPropertyMetadata {
  property: string;
  type: string;
  description: string;
  defaultValue: any;
  currentValue: any;
}

export class ConfigurationPropertiesMetadata {
  private static INSTANCE: ConfigurationPropertiesMetadata;
  private propertiesMap: { [key: string]: ConfigurationPropertyMetadata } = {};

  public static getInstance() {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new ConfigurationPropertiesMetadata();
    }
    return this.INSTANCE;
  }

  public register(property: string, type: string, description: string, defaultValue: any) {
    this.propertiesMap[property] = {
      property: property,
      type: type,
      description: description,
      defaultValue: defaultValue,
      currentValue: defaultValue
    };
  }

  public getProperties(): ConfigurationPropertyMetadata[] {
    return Object.keys(this.propertiesMap)
      .map(key => {
        return this.propertiesMap[key];
      })
      .sort((a, b) => {
        return a.property.localeCompare(b.property);
      });
  }

}

export class ConfigurationProperties {
  @Property('string', 'content_path')
  contentPath = '';

  @Property('string', 'file_encoding')
  fileEncoding = 'utf8';
}
