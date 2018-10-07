import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {

  public fileContent;

  constructor(private route: ActivatedRoute,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.fileContent = data.file;
      this.ref.detectChanges();
    });
  }

}
