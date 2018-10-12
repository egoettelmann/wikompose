import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class FileService implements Resolve<string> {

  constructor(private electronService: ElectronService,
              private httpClient: HttpClient
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const filePath = route.queryParamMap.getAll('file');
    return this.getContent(filePath);
  }

  public getFileTree(): Observable<any> {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:get//routes', (event, arg) => {
          observer.next(arg);
          observer.complete();
        });
        this.electronService.ipcRenderer.send('main:get//routes', {});
      });
    } else {
      return this.httpClient.get('./assets/test/file-tree.json');
    }
  }

  public getContent(filePath: string[]): Observable<any> {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:get//content', (event, arg) => {
          observer.next(arg);
          observer.complete();
        });
        this.electronService.ipcRenderer.send('main:get//content', filePath);
      });
    } else {
      return this.httpClient.get('./assets/test/content/' + filePath.join('/') + '.md', { responseType: 'text' })
        .pipe(
          map(content => {
            return {
              path: filePath,
              content: content
            };
          })
        );
    }
  }

  public saveContent(filePath: string[], fileContent: string): Observable<any> {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:post//content', (event, arg) => {
          observer.next(arg);
          observer.complete();
        });
        this.electronService.ipcRenderer.send('main:post//content', { path: filePath, content: fileContent });
      });
    } else {
      return this.httpClient.post('./assets/test/content/' + filePath.join('/') + '.md', fileContent);
    }
  }

}
