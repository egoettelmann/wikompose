import { Component, OnInit } from '@angular/core';
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
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.fileService.getFileTree().subscribe(fileTree => {
      this.files = fileTree;
    });
    this.router.navigate(['/content/view'], { queryParams: { file: ['notes'] } });
  }

}
