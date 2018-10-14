import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigurationService {

  constructor(private electronService: ElectronService,
              private httpClient: HttpClient
  ) {
  }

  public loadConfiguration() {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:get//config', (event, arg) => {
          observer.next(arg);
          observer.complete();
        });
        this.electronService.ipcRenderer.send('main:get//config', {});
      });
    } else {
      return this.httpClient.get('./assets/test/config.json');
    }
  }

  public getConfigurationSettings() {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:get//settings/config', (event, arg) => {
          observer.next(arg);
          observer.complete();
        });
        this.electronService.ipcRenderer.send('main:get//settings/config', {});
      });
    } else {
      return this.httpClient.get('./assets/test/config.json');
    }
  }

  public setConfiguration(property: string, value: any) {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:post//settings/config', (event, arg) => {
          observer.next(arg);
          observer.complete();
        });
        this.electronService.ipcRenderer.send('main:post//settings/config', {
          property: property,
          value: value
        });
      });
    } else {
      return this.httpClient.get('./assets/test/config.json');
    }
  }

}
