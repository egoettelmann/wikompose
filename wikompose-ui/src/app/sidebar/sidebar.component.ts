import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() public items: any;
  @Input() public currentItem: any;
  @Output() public select = new EventEmitter<string[]>();

  public selectFile(filePath: string[]) {
    this.select.emit(filePath);
  }

}
