import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'brace/mode/markdown';
import 'brace/theme/github';
import { FileService } from '../../../services/file.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit, OnDestroy {

  public file: { path: string[], content: string };
  private subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParamMap.subscribe(queryParams => {
      const rawFilePath = queryParams.get('file');
      const filePath = FileService.decodeFilePath(rawFilePath);
      this.fileService.getContent(filePath).subscribe(content => {
        this.file = content;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateContent(newContent: string) {
    this.fileService.saveContent(this.file.path, newContent).subscribe(() => {
      console.log('ok');
    });
  }

}
