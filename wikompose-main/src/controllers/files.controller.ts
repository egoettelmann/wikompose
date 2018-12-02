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
    const content = this.fileManagementService.getFileContent(args.queryParams.path);
    return {
      path: args.queryParams.path,
      content: content
    } as FileModel;
  }

  @Route('content', 'POST')
  private registerFileWrite(args: any) {
    // Writing the content
    this.fileManagementService.saveFileContent(args.queryParams.path, args.body);
  }
}
