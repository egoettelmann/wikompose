import * as fs from 'fs';
import * as path from 'path';
import { ConfigurationService } from './configuration.service';
import { injectable } from 'inversify';
import { InternalError } from '../models/errors.model';

@injectable()
export class FileManagementService {

  constructor(private configurationService: ConfigurationService) {
  }

  /**
   * Gets all files as a tree (organized by folders).
   */
  public getFileTree() {
    if (!this.configurationService.getConfiguration().contentPath) {
      throw new InternalError('501', 'contend_path_undefined', 'No content path defined');
    }
    return this.walkSync(this.configurationService.getConfiguration().contentPath);
  }

  /**
   * Gets a file's content.
   *
   * @param filePath the file path as an array
   */
  public getFileContent(filePath: string[]): string {
    const file = path.join(this.configurationService.getConfiguration().contentPath, ...filePath) + '.md';
    return fs.readFileSync(file, 'utf8');
  }

  /**
   * Saves a file's content.
   *
   * @param filePath the file path as an array
   * @param fileContent the new file content
   */
  public saveFileContent(filePath: string[], fileContent: string): void {
    const file = path.join(this.configurationService.getConfiguration().contentPath, ...filePath) + '.md';
    fs.writeFileSync(file, fileContent, 'utf8');
  }

  /**
   * Creates a new empty file.
   *
   * @param filePath the file path as an array
   * @param fileContent the new file content
   */
  public createFile(filePath: string[], fileContent: string) {
    const file = path.join(this.configurationService.getConfiguration().contentPath, ...filePath) + '.md';
    fs.writeFileSync(file, fileContent, 'utf8');
  }

  /**
   * Creates a new empty folder.
   *
   * @param filePath the file path as an array
   */
  public createFolder(filePath: string[]) {
    const folder = path.join(this.configurationService.getConfiguration().contentPath, ...filePath);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
  }

  /**
   * Deletes an existing file or folder.
   *
   * @param filePath the file path as an array
   */
  public deleteFile(filePath: string[]) {
    const folder = path.join(this.configurationService.getConfiguration().contentPath, ...filePath);
    const file = folder + '.md';
    if (fs.existsSync(folder)) {
      this.rmdirForceSync(folder);
    } else if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
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

  /**
   * Removes a non-empty folder recursively.
   *
   * @param filePath the file path to remove
   */
  private rmdirForceSync(filePath: string) {
    if (fs.existsSync(filePath)) {
      fs.readdirSync(filePath).forEach((file) => {
        const currentPath = path.join(filePath, file);
        if (fs.lstatSync(currentPath).isDirectory()) {
          this.rmdirForceSync(currentPath);
        } else {
          fs.unlinkSync(currentPath);
        }
      });
      fs.rmdirSync(filePath);
    }
  }

}
