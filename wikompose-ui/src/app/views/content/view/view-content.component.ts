import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit {

  public file: { path: string, content: string };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.file = data.file;
    });
  }

}
