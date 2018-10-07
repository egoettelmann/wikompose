import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public fileContent;
  public files = {};

  constructor(private fileService: FileService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.fileService.getFileTree().subscribe(fileTree => {
      this.files = fileTree;
      this.ref.detectChanges();
    });
    this.fileService.getContent(['notes']).subscribe(content => {
      this.fileContent = content;
      this.ref.detectChanges();
    });
  }

  public loadFile(filePath: string[]) {
    this.fileService.getContent(filePath).subscribe(content => {
      this.fileContent = content;
      this.ref.detectChanges();
    });
  }

}
