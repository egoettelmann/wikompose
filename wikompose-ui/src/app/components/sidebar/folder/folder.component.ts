import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  @Output() delete = new EventEmitter<string[]>();

  @ViewChild('itemInput') itemInput: ElementRef;

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

  openFolderMenu(file?: string) {
    return this.contextMenuService.open([
      {
        label: 'New folder',
        action: () => {
          this.opened = true;
          this.create = { path: [], type: 'folder' };
          this.focusInput();
        }
      },
      {
        label: 'New file',
        action: () => {
          this.opened = true;
          this.create = { path: [], type: 'file' };
          this.focusInput();
        }
      },
      {
        label: 'Delete',
        action: () => {
          if (file) {
            this.deleteItem([file]);
          } else {
            this.deleteItem([]);
          }
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

  deleteItem(path: string[]) {
    if (this.folder.key) {
      this.delete.emit([this.folder.key, ...path]);
    } else {
      this.delete.emit(path);
    }
  }

  onInput(event, type: 'file' | 'folder') {
    console.log(event.target.value);
    this.create = undefined;
    this.createNewItem({ path: [event.target.value], type: type });
  }

  private focusInput() {
    setTimeout(() => {
      this.itemInput.nativeElement.focus();
    });
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
