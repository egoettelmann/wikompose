import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private route: ActivatedRoute,
              private router: Router
  ) {
  }

  save() {
    this.close();
  }

  close() {
    this.router.navigate([{ outlets: { 'modal': null } }], { preserveQueryParams: true });
  }

}
