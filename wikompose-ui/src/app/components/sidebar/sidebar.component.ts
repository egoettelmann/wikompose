import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() items: any;
  @Output() newFile = new EventEmitter<string[]>();
  @Output() newFolder = new EventEmitter<string[]>();
  @Output() delete = new EventEmitter<string[]>();

  constructor(
    private router: Router
  ) {}

  open(filePath: string[]) {
    this.router.navigate(['/content/view'], {
      queryParams: {
        file: FileService.encodeFilePath(filePath)
      }
    });
  }

  createNewItem(createItem: { path: string[], type: 'file' | 'folder' }) {
    if (createItem.type === 'file') {
      this.newFile.emit(createItem.path);
    } else {
      this.newFolder.emit(createItem.path);
    }
  }

  deleteItem(path: string[]) {
    this.delete.emit(path);
  }

}
