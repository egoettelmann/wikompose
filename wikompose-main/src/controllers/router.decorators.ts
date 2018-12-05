export interface Controller {}

export const MetadataKeys = {
  ROUTES: Symbol.for('ROUTER_ROUTES'),
  METHOD: Symbol.for('METHOD'),
  URL: Symbol.for('URL')
};

export function Route(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'): Function {
  return (target: object, propertyKey: string) => {
    // Registering the METHOD
    Reflect.defineMetadata(MetadataKeys.METHOD, method, target, propertyKey);
    // Registering the URL
    Reflect.defineMetadata(MetadataKeys.URL, url, target, propertyKey);
    // Registering the ROUTE
    let properties: string[] = Reflect.getMetadata(MetadataKeys.ROUTES, target);
    if (properties) {
      properties.push(propertyKey);
    } else {
      properties = [propertyKey];
      Reflect.defineMetadata(MetadataKeys.ROUTES, properties, target);
    }
  };
}
