import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  configurableProperties: any[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private configurationService: ConfigurationService
  ) {
  }

  ngOnInit(): void {
    this.configurationService.getConfigurationSettings().subscribe(settings => {
      this.configurableProperties = settings.slice(0);
    });
  }

  onValueChange(property: string, event: any) {
    this.configurationService.setConfiguration(property, event.target.value).subscribe(() => {
      this.router.navigate(['/content/view']);
    });
  }

  save() {
    this.close();
  }

  close() {
    this.router.navigate([{ outlets: { 'modal': null } }], { preserveQueryParams: true });
  }

}
