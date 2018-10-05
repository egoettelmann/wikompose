import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { HttpClient } from '@angular/common/http';
import { bindCallback, Observable } from 'rxjs';

@Injectable()
export class FileService {

  constructor(private electronService: ElectronService,
              private httpClient: HttpClient
  ) {
  }

  public getFileTree(): Observable<any> {
    if (this.electronService.isElectronApp) {
      const callback = bindCallback(this.electronService.ipcRenderer.on);
      this.electronService.ipcRenderer.send('main/routes', {});
      return callback('ui/routes');
    } else {
      return this.httpClient.get('./assets/test/file-tree.json');
    }
  }

  public getContent(filePath: string[]): Observable<any> {
    if (this.electronService.isElectronApp) {
      const callback = bindCallback(this.electronService.ipcRenderer.on);
      this.electronService.ipcRenderer.send('main/content', filePath);
      return callback('ui/content');
    } else {
      return this.httpClient.get('./assets/test/content/' + filePath.join('/') + '.md', { responseType: 'text' });
    }
  }

}
