import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FileService } from '../../../services/file.service';

@Component({
  selector: '[wk-file-list]',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnChanges {

  @Input() items: any;
  @Output() newFile = new EventEmitter<string[]>();

  public opened: boolean[] = [];
  public sortedItems: { key: string, value: any }[];

  constructor(private keyValuePipe: KeyValuePipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.sortedItems = this.unwrap(this.items);
    }
  }

  createNewFile(fileName: string[], folder?: string) {
    const filePath = fileName.slice(0);
    if (folder) {
      filePath.unshift(folder);
    }
    this.newFile.emit(filePath);
  }

  getQueryParam(filePath: string[]) {
    return {
      file: FileService.encodeFilePath(filePath)
    };
  }

  private unwrap(items: any): any[] {
    // Transforming the object to a list of key/value
    const keyValues = this.keyValuePipe.transform(items) as any[];
    if (!keyValues) {
      return [];
    }
    keyValues.forEach((k, idx) => {
      this.opened[idx] = true;
    });
    // Sort: folder before files, otherwise alphabetically
    return keyValues.sort((a: any, b: any) => {
      if (a.value !== null && b.value === null) {
        return -1;
      }
      if (a.value === null && b.value !== null) {
        return 1;
      }
      return a.key.localeCompare(b.key);
    });
  }

}
