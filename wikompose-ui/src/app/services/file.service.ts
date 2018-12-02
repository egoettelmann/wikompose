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
    return this.httpElectronService.get('routes');
  }

  public getContent(filePath: string[]): Observable<any> {
    const httpParams = {
      path: filePath
    };
    return this.httpElectronService.get('content', { params: httpParams });
  }

  public saveContent(filePath: string[], fileContent: string): Observable<any> {
    const httpParams = {
      path: filePath
    };
    return this.httpElectronService.post('content', fileContent, { params: httpParams });
  }

}
