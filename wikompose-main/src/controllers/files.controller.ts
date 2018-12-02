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
  private fileContent(args: any) {
    // Loading the content
    const filePath = Array.isArray(args.queryParams.path) ? args.queryParams.path : [args.queryParams.path];
    const content = this.fileManagementService.getFileContent(filePath);
    return {
      path: filePath,
      content: content
    } as FileModel;
  }

  @Route('/content', 'POST')
  private registerFileWrite(args: any) {
    const filePath = Array.isArray(args.queryParams.path) ? args.queryParams.path : [args.queryParams.path];
    // Writing the content
    this.fileManagementService.saveFileContent(filePath, args.body.content);
  }
}
