import { Component, OnInit } from '@angular/core';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public fileContent;
  public files = {};

  constructor(private fileService: FileService) {
  }

  ngOnInit(): void {
    this.fileService.getFileTree().subscribe(fileTree => {
      console.log('fileTree', fileTree);
      this.files = fileTree;
    });
    this.fileService.getContent(['test']).subscribe(content => {
      console.log('content', content);
      this.fileContent = content;
    });
  }

}
