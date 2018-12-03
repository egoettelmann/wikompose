import * as fs from 'fs';
import * as path from 'path';
import { ConfigurationService } from './configuration.service';
import { injectable } from 'inversify';
import { ConfigurationProperties } from '../models/configuration.model';

@injectable()
export class FileManagementService {

  private configuration: ConfigurationProperties;

  constructor(private configurationService: ConfigurationService) {
    this.configuration = configurationService.getConfiguration();
  }

  /**
   * Gets all files as a tree (organized by folders).
   */
  public getFileTree() {
    if (!this.configuration.contentPath) {
      return undefined; // FIXME: throw exception and add exception handler
    }
    return this.walkSync(this.configuration.contentPath);
  }

  /**
   * Gets a file's content.
   *
   * @param filePath the file path as an array
   */
  public getFileContent(filePath: string[]): string {
    const file = path.join(this.configuration.contentPath, ...filePath) + '.md';
    return fs.readFileSync(file, 'utf8');
  }

  /**
   * Saves a file's content.
   *
   * @param filePath the file path as an array
   * @param fileContent the new file content
   */
  public saveFileContent(filePath: string[], fileContent: string): void {
    const file = path.join(this.configuration.contentPath, ...filePath) + '.md';
    fs.writeFileSync(file, fileContent, 'utf8');
  }

  /**
   * Creates a new empty file.
   *
   * @param filePath the file path as an array
   * @param fileContent the new file content
   */
  public createFile(filePath: string[], fileContent: string) {
    const file = path.join(this.configuration.contentPath, ...filePath) + '.md';
    fs.writeFileSync(file, fileContent, 'utf8');
  }

  /**
   * Walks a folder to list all files recursively and groups them by sub-folder.
   *
   * @param dir the folder to walk
   */
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
