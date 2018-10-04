import { Component } from '@angular/core';

@Component({
  selector: 'wk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public items = {
    'todo': {},
    'projects': {
      'perso': {
        'wikompose': {},
        'other': {}
      },
      'pro': {
        'hidden': {},
        'nope': {}
      }
    },
    'other': {
      'other1': {},
      'other2': {}
    }
  };

}
