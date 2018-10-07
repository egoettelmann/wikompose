import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { HttpClient } from '@angular/common/http';
import { bindNodeCallback, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

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
        this.electronService.ipcRenderer.on('ui/routes', (event, arg) => {
          observer.next(arg);
          observer.complete();
        });
        this.electronService.ipcRenderer.send('main/routes', {});
      });
    } else {
      return this.httpClient.get('./assets/test/file-tree.json');
    }
  }

  public getContent(filePath: string[]): Observable<any> {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.on('ui/content', (event, arg) => {
          observer.next(arg);
          observer.complete();
        });
        this.electronService.ipcRenderer.send('main/content', filePath);
      });
    } else {
      return this.httpClient.get('./assets/test/content/' + filePath.join('/') + '.md', { responseType: 'text' });
    }
  }

}
