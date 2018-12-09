import 'reflect-metadata';
import { InversifyContainer, Symbols } from './inversify.config';
import { Express, Request, Response } from 'express';
import { App, ipcMain } from 'electron';
import { Controller, MetadataKeys } from './controllers/router.decorators';
import { RestResponse, RestRequest, RestErrorResponse } from './models/rest.model';
import { InternalError } from './models/errors.model';

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
    const methodName = method.toLowerCase();
    if (this.isElectronApp) {
      ipcMain.on('main:' + method.toLowerCase() + '/' + url, (event: any, args: RestRequest) => {
        const response = this.buildResponse(callback, args);
        event.sender.send('ui:' + method.toLowerCase() + '/' + url, response);
      });
    } else {
      const expressApp = this.app as any;
      expressApp[methodName](url, (req: Request, res: Response) => {
        const args = {
          queryParams: req.query,
          body: req.body
        } as RestRequest;
        const response = this.buildResponse(callback, args);
        res.status(response.error ? 500 : 200);
        res.send(response.content);
      });
    }
  }

  buildResponse(callback: Function, args: RestRequest): RestResponse {
    let response: RestResponse;
    try {
      response = {
        error: false,
        content: callback(args)
      };
    } catch (e) {
      const error: RestErrorResponse = {
        code: '500',
        message: 'unexpected_error',
        details: e.message
      };
      if (e instanceof InternalError) {
        error.code = e.code;
        error.message = e.message;
        error.details = e.stack;
      }
      response = {
        error: true,
        content: error
      };
    }
    return response;
  }

}
