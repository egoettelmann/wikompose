import { Component, Input } from '@angular/core';

@Component({
  selector: 'wk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() public items: any;

}
