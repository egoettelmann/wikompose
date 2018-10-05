import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public fileToLoad = 'assets/test.md';
  public files = {};

  constructor(private electronService: ElectronService) {
  }

  ngOnInit(): void {
    this.electronService.ipcRenderer.on('ui/routes', (event, arg) => {
      console.log(arg);
      this.files = arg;
    });
    this.electronService.ipcRenderer.on('ui/content', (event, arg) => {
      console.log(arg);
    });
    this.electronService.ipcRenderer.send('main/routes', {});
    this.electronService.ipcRenderer.send('main/content', ['admin']);
  }

}
