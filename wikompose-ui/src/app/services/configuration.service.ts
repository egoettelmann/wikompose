import { Injectable } from '@angular/core';
import { HttpElectronService } from './http-electron.service';

@Injectable()
export class ConfigurationService {

  constructor(
    private httpElectronService: HttpElectronService
  ) {
  }

  public loadConfiguration() {
    return this.httpElectronService.get('/config');
  }

  public getConfigurationSettings() {
    return this.httpElectronService.get('/settings/config');
  }

  public setConfiguration(property: string, value: any) {
    const body = {
      property: property,
      value: value
    };
    return this.httpElectronService.post('/settings/config', body);
  }

}
