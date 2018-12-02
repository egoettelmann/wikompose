import 'reflect-metadata';
import { InversifyContainer, Symbols } from './inversify.config';
import { Express } from 'express';
import { App, ipcMain } from 'electron';
import { Controller, MetadataKeys } from './controllers/router.decorators';

export class WikomposeMainApp {

  constructor(
    private app: Express | App,
    private isElectronApp: boolean
  ) {
  }

  init() {
    // Registering routes
    console.log('Registering routes for', this.isElectronApp ? 'Electron' : 'Express');
    const controllers = InversifyContainer.getAll<Controller>(Symbols.Controller);
    controllers.forEach(ctrl => {
      const metadata = Reflect.getMetadata(MetadataKeys.ROUTES, ctrl) as string[];
      metadata.forEach(propertyKey => {
        const url = Reflect.getMetadata(MetadataKeys.URL, ctrl, propertyKey);
        const method = Reflect.getMetadata(MetadataKeys.METHOD, ctrl, propertyKey);
        const callback = (ctrl as any)[propertyKey] as Function;
        this.registerRoute(url, method, callback.bind(ctrl));
        console.log('Registered route', ctrl.constructor.name, propertyKey, url, method);
      });
    });

    console.log('Main app init finished');
  }

  registerRoute(url: string, method: string, callback: Function) {
    if (this.isElectronApp) {
      ipcMain.on('main:' + method.toLowerCase() + '/' + url, (event: any, args: any) => {
        event.sender.send('ui:' + method.toLowerCase() + '/' + url, callback(args));
      });
    } else {
      const expressApp = this.app as Express;
      switch (method) {
        case 'POST':
          expressApp.post(url, function (req, res) {
            res.send(callback(req));
          });
          break;
        default:
          expressApp.get(url, (req, res) => {
            res.send(callback(req));
          });
          break;
      }
    }
  }

}
