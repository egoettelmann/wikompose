import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'brace/mode/markdown';
import { FileService } from '../../../services/file.service';

@Component({
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {

  public file: { path: string[], content: string };

  constructor(private route: ActivatedRoute,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.file = data.file;
    });
  }

  updateContent(newContent: string) {
    this.fileService.saveContent(this.file.path, newContent).subscribe(() => {
      console.log('ok');
    });
  }

}
