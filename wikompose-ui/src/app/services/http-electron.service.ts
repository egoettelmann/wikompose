import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElectronService } from 'ngx-electron';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { toast } from 'bulma-toast';

/**
 * Wrapper for using both HttpClient / IPCRenderer, depending on the current runtime environment.
 */
@Injectable()
export class HttpElectronService {

  constructor(
    private ngZone: NgZone,
    private httpClient: HttpClient,
    private electronService: ElectronService
  ) {
  }

  /**
   * Performs a get request.
   *
   * @param url the url
   * @param httpOptions the Angular get options
   */
  public get(url: string, httpOptions?: any): Observable<any> {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:get/' + url, (event, arg) => {
          this.ngZone.run(() => {
            if (arg.error) {
              observer.error(arg.content);
            } else {
              observer.next(arg.content);
              observer.complete();
            }
          });
        });
        this.electronService.ipcRenderer.send('main:get/' + url,
          this.buildElectronArgs(httpOptions)
        );
      });
    } else {
      return this.httpClient.get(url, httpOptions).pipe(
        catchError(e => this.handleError(e.error))
      );
    }
  }

  /**
   * Performs a post request.
   *
   * @param url the url
   * @param body the body
   * @param httpOptions the Angular post options
   */
  public post(url: string, body: any, httpOptions?: any): Observable<any> {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:post/' + url, (event, arg) => {
          this.ngZone.run(() => {
            if (arg.error) {
              observer.error(arg.content);
            } else {
              observer.next(arg.content);
              observer.complete();
            }
          });
        });
        this.electronService.ipcRenderer.send('main:post/' + url,
          this.buildElectronArgs(httpOptions, body)
        );
      });
    } else {
      return this.httpClient.post(url, body, httpOptions).pipe(
        catchError(e => this.handleError(e.error))
      );
    }
  }

  /**
   * Performs a put request.
   *
   * @param url the url
   * @param body the body
   * @param httpOptions the Angular put options
   */
  public put(url: string, body: any, httpOptions?: any): Observable<any> {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:put/' + url, (event, arg) => {
          this.ngZone.run(() => {
            if (arg.error) {
              observer.error(arg.content);
            } else {
              observer.next(arg.content);
              observer.complete();
            }
          });
        });
        this.electronService.ipcRenderer.send('main:put/' + url,
          this.buildElectronArgs(httpOptions, body)
        );
      });
    } else {
      return this.httpClient.put(url, body, httpOptions).pipe(
        catchError(e => this.handleError(e.error))
      );
    }
  }

  /**
   * Performs a delete request.
   *
   * @param url the url
   * @param httpOptions the Angular put options
   */
  public delete(url: string, httpOptions?: any): Observable<any> {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:delete/' + url, (event, arg) => {
          this.ngZone.run(() => {
            if (arg.error) {
              observer.error(arg.content);
            } else {
              observer.next(arg.content);
              observer.complete();
            }
          });
        });
        this.electronService.ipcRenderer.send('main:delete/' + url,
          this.buildElectronArgs(httpOptions)
        );
      });
    } else {
      return this.httpClient.delete(url, httpOptions).pipe(
        catchError(e => this.handleError(e.error))
      );
    }
  }

  /**
   * Builds the object to pass to the Electron IPCRenderer as arguments.
   *
   * @param httpOptions the http options
   * @param requestBody the request body
   */
  private buildElectronArgs(httpOptions?: any, requestBody?: any) {
    const args = {} as any;
    if (httpOptions && httpOptions.params) {
      args.queryParams = httpOptions.params;
    }
    if (requestBody) {
      args.body = requestBody;
    }
    return args;
  }

  private handleError(error: any) {
    console.log('ERROR', error);
    toast({
      message: error.message + ': ' + error.details,
      duration: 5000,
      type: 'is-danger',
      dismissible: true
    });
    return throwError(error);
  }

}
