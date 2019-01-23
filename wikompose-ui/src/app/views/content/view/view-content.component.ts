import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../services/file.service';
import { Subscription } from 'rxjs';

declare var Prism: any;

@Component({
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit, OnDestroy {

  public file: { path: string, content: string };
  private subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private fileService: FileService
  ) {
    if (Prism !== undefined) {
      Prism.plugins.customClass.prefix('prism--');
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParamMap.subscribe(queryParams => {
      const rawFilePath = queryParams.get('file');
      if (rawFilePath) {
        const filePath = FileService.decodeFilePath(rawFilePath);
        this.fileService.getContent(filePath).subscribe(content => {
          this.file = content;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
