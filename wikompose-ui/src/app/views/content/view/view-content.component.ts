import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit {

  public fileContent: string;

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
