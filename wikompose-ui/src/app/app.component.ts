import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FileService } from './services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public files = {};
  public sidebarWidth;

  constructor(private router: Router,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.fileService.getFileTree().subscribe(fileTree => {
      if (fileTree === undefined) {
        this.router.navigate([{ outlets: { 'modal': ['settings'] } }]);
      } else {
        this.files = fileTree;
        this.router.navigate(['/content/view'], { queryParams: { file: ['notes'] } });
      }
    });
  }

  createNewFile(filePath: string[]) {
    this.fileService.createFile(filePath, '').subscribe(() => {
      this.ngOnInit();
    });
  }

  createNewFolder(filePath: string[]) {
    this.fileService.createFolder(filePath).subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteItem(path: string[]) {
    this.fileService.delete(path).subscribe(() => {
      this.ngOnInit();
    });
  }

  @HostListener('body:contextmenu', ['$event'])
  preventRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  resizing(event: { edges: any, rectangle: any }) {
    this.sidebarWidth = event.rectangle.width;
  }

}
