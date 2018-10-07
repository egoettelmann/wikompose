import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public fileContent;

  constructor(private route: ActivatedRoute,
              private fileService: FileService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      const filePath = queryParams.getAll('file');
      this.loadFile(filePath);
    });
  }

  public loadFile(filePath: string[]) {
    this.fileService.getContent(filePath).subscribe(content => {
      this.fileContent = content;
      this.ref.detectChanges();
    });
  }

}
