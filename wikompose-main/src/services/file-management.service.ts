import * as fs from 'fs';
import * as path from 'path';

export class FileManagementService {

  private static BASE_FOLDER = '';

  public static getFileTree() {
    return this.walkSync(this.BASE_FOLDER);
  }

  public static getFileContent(filePath: string[]) {
    const file = path.join(this.BASE_FOLDER, ...filePath, '.md');
    console.log('getFileContent', file);
    return fs.readFileSync(file, 'uft8');
  }

  private static walkSync(dir: string): any {
    const files = fs.readdirSync(dir);
    const fileTree = {} as any;
    files
      .filter(f => f.substr(0, 1) !== '.')
      .map(file => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
          fileTree[file] = this.walkSync(path.join(dir, file));
        } else {
          if (file.slice(-3) === '.md') {
            fileTree[file.slice(0, -3)] = null;
          }
        }
      });
    return fileTree;
  }
}
