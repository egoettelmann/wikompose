import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FileService } from '../../../services/file.service';
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

  @Input() items: any[];
  @Output() newItem = new EventEmitter<CreateItem>();
  @Output() openFile = new EventEmitter<string[]>();

  public create: CreateItem;
  public opened: boolean[] = [];
  public sortedItems: { key: string, value: any }[];

  constructor(
    private keyValuePipe: KeyValuePipe,
    private contextMenuService: ContextMenuService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.sortedItems = this.unwrap(this.items);
    }
  }

  open(items: string[], item: string) {
    const filePath = items.slice(0);
    filePath.unshift(item);
    this.openFile.emit(filePath);
  }

  openMenu() {
    return this.contextMenuService.open([
      {
        label: 'New folder',
        action: () => {
          this.create = { path: [], type: 'folder' };
        }
      },
      {
        label: 'New file',
        action: () => {
          this.create = { path: [], type: 'file' };
        }
      }
    ]);
  }

  createNewItem(item: CreateItem, folder?: string) {
    const filePath = item.path.slice(0);
    if (folder) {
      filePath.unshift(folder);
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
