import { ApplicationRef, Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FileService {

  constructor(private electronService: ElectronService,
              private httpClient: HttpClient,
              private applicationRef: ApplicationRef
  ) {
  }

  public static encodeFilePath(filePath: string[]): string {
    return encodeURIComponent(filePath.join(','));
  }

  public static decodeFilePath(filePath: string): string[] {
    return decodeURIComponent(filePath).split(',');
  }

  public getFileTree(): Observable<any> {
    if (this.electronService.isElectronApp) {
      return Observable.create(observer => {
        this.electronService.ipcRenderer.once('ui:get//routes', (event, arg) => {
          observer.next(arg);
          observer.complete();
          this.applicationRef.tick();
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
          this.applicationRef.tick();
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
