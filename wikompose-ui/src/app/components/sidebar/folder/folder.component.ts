import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { ContextMenuService } from '../../../services/context-menu.service';

declare interface CreateItem {
  path: string[];
  type: 'folder' | 'file';
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnChanges {

  @Input() folder: { key: string, value: any[] };
  @Output() newItem = new EventEmitter<CreateItem>();
  @Output() openFile = new EventEmitter<string[]>();

  public create: CreateItem;
  public opened = true;
  public sortedItems: { key: string, value: any }[];

  constructor(
    private keyValuePipe: KeyValuePipe,
    private contextMenuService: ContextMenuService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.folder) {
      this.sortedItems = this.unwrap(this.folder.value);
    }
  }

  open(items: string[]) {
    const filePath = items.slice(0);
    if (this.folder.key) {
      filePath.unshift(this.folder.key);
    }
    this.openFile.emit(filePath);
  }

  openFolderMenu() {
    return this.contextMenuService.open([
      {
        label: 'New folder',
        action: () => {
          this.opened = true;
          this.create = { path: [], type: 'folder' };
        }
      },
      {
        label: 'New file',
        action: () => {
          this.opened = true;
          this.create = { path: [], type: 'file' };
        }
      }
    ]);
  }

  createNewItem(item: CreateItem) {
    const filePath = item.path.slice(0);
    if (this.folder.key) {
      filePath.unshift(this.folder.key);
    }
    this.newItem.emit({ path: filePath, type: item.type });
  }

  onInput(event, type: 'file' | 'folder') {
    console.log(event.target.value);
    this.create = undefined;
    this.createNewItem({ path: [event.target.value], type: type });
  }

  private unwrap(items: any): any[] {
    // Transforming the object to a list of key/value
    const keyValues = this.keyValuePipe.transform(items) as any[];
    if (!keyValues) {
      return [];
    }
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
