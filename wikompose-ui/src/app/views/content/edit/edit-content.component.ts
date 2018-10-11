import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'brace/mode/markdown';
import { FileService } from '../../../services/file.service';

@Component({
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {

  public fileContent: string;
  private filePath : string[];

  constructor(private route: ActivatedRoute,
              private fileService: FileService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filePath = this.route.snapshot.queryParamMap.getAll('file');
    this.route.parent.data.subscribe(data => {
      this.fileContent = data.file;
      this.ref.detectChanges();
    });
  }

  updateContent(newContent: string) {
    this.fileService.saveContent(this.filePath, newContent).subscribe(() => {
      console.log('ok');
    });
  }

}
