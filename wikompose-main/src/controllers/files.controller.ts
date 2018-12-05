import { FileManagementService } from '../services/file-management.service';
import { injectable } from 'inversify';
import { Route } from './router.decorators';

class FileModel {
  path: string[];
  content: string;
}

@injectable()
export class FilesController {

  constructor(
    private fileManagementService: FileManagementService
  ) {
  }

  @Route('/content')
  public fileContent(args: any) {
    const filePath = Array.isArray(args.queryParams.path) ? args.queryParams.path : [args.queryParams.path];
    const content = this.fileManagementService.getFileContent(filePath);
    return {
      path: filePath,
      content: content
    } as FileModel;
  }

  @Route('/content', 'POST')
  public registerFileWrite(args: any) {
    const filePath = Array.isArray(args.queryParams.path) ? args.queryParams.path : [args.queryParams.path];
    this.fileManagementService.saveFileContent(filePath, args.body.content);
  }

  @Route('/content', 'PUT')
  public createFile(args: any) {
    const filePath = Array.isArray(args.queryParams.path) ? args.queryParams.path : [args.queryParams.path];
    this.fileManagementService.createFile(filePath, args.body.content);
  }

  @Route('/content', 'DELETE')
  public delete(args: any) {
    const filePath = Array.isArray(args.queryParams.path) ? args.queryParams.path : [args.queryParams.path];
    this.fileManagementService.deleteFile(filePath);
  }

  @Route('/folder', 'PUT')
  public createFolder(args: any) {
    const filePath = Array.isArray(args.queryParams.path) ? args.queryParams.path : [args.queryParams.path];
    this.fileManagementService.createFolder(filePath);
  }

}
