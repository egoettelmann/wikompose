import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {

  @Input() items: any;
  @Output() newFile = new EventEmitter<string[]>();

  ngOnChanges(changes: SimpleChanges): void {
  }

  createNewFile(fileName: string[]) {
    this.newFile.emit(fileName);
  }

}
