import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'wk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {

  @Input() public items: any;

  public sortedItems: { key: string, value: any }[];

  constructor(private keyValuePipe: KeyValuePipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.sortedItems = this.unwrap(this.items);
    }
  }

  hasItems(item: any) {
    return item.value !== null && item.value.length > 0;
  }

  private unwrap(items: any): any[] {
    // Transforming the object to a list of key/value
    const keyValues = this.keyValuePipe.transform(items) as any[];
    if (!keyValues) {
      return [];
    }
    // Recursively unwrap nested values
    const unwrappedItems = keyValues.map(item => {
      if (item.value !== null) {
        item.value = this.unwrap(item.value);
      }
      return item;
    });
    // Sort: folder before files, otherwise alphabetically
    return unwrappedItems.sort((a: any, b: any) => {
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
