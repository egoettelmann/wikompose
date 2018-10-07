import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FileService } from './services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public files = {};

  constructor(private router: Router,
              private fileService: FileService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.fileService.getFileTree().subscribe(fileTree => {
      this.files = fileTree;
      this.ref.detectChanges();
    });
    this.router.navigate(['/content'], { queryParams: { file: ['notes'] } });
  }

}
