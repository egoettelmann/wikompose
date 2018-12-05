import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpElectronService } from './http-electron.service';

@Injectable()
export class FileService {

  constructor(private httpElectronService: HttpElectronService
  ) {
  }

  public static encodeFilePath(filePath: string[]): string {
    return encodeURIComponent(filePath.join(','));
  }

  public static decodeFilePath(filePath: string): string[] {
    return decodeURIComponent(filePath).split(',');
  }

  public getFileTree(): Observable<any> {
    return this.httpElectronService.get('/routes');
  }

  public getContent(filePath: string[]): Observable<any> {
    const httpParams = {
      path: filePath
    };
    return this.httpElectronService.get('/content', { params: httpParams });
  }

  public saveContent(filePath: string[], fileContent: string): Observable<any> {
    const httpParams = {
      path: filePath
    };
    const httpBody = {
      content: fileContent
    };
    return this.httpElectronService.post('/content', httpBody, { params: httpParams });
  }

  public createFile(filePath: string[], fileContent: string): Observable<any> {
    const httpParams = {
      path: filePath
    };
    const httpBody = {
      content: fileContent
    };
    return this.httpElectronService.put('/content', httpBody, { params: httpParams });
  }

  public createFolder(filePath: string[]): Observable<any> {
    const httpParams = {
      path: filePath
    };
    return this.httpElectronService.put('/folder', {}, { params: httpParams });
  }

  public delete(filePath: string[]): Observable<any> {
    const httpParams = {
      path: filePath
    };
    return this.httpElectronService.delete('/content', { params: httpParams });
  }

}
