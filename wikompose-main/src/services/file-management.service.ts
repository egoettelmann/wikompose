import * as fs from 'fs';
import * as path from 'path';

export class FileManagementService {

  constructor(private baseFolder: string) {
  }

  public getFileTree() {
    if (!this.baseFolder) {
      return undefined; // FIXME: throw exception and add exception handler
    }
    return this.walkSync(this.baseFolder);
  }

  public getFileContent(filePath: string[]): string {
    const file = path.join(this.baseFolder, ...filePath) + '.md';
    return fs.readFileSync(file, 'utf8');
  }

  public saveFileContent(filePath: string[], fileContent: string): void {
    const file = path.join(this.baseFolder, ...filePath) + '.md';
    fs.writeFileSync(file, fileContent, 'utf8');
  }

  private walkSync(dir: string): any {
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
