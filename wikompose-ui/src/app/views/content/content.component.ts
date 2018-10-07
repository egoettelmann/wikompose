import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {

  constructor(private route: ActivatedRoute) {
  }

  public isEditMode() {
    const childUrl = this.route.snapshot.firstChild.url;
    if (childUrl.length > 0) {
      return childUrl[0].path === 'edit';
    }
  }

}
