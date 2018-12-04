import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ContextMenuItem, ContextMenuService } from '../../services/context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @ViewChild('contextMenu') contextMenu: ElementRef;

  public currentMenuItems: ContextMenuItem[];
  public currentCursorPosition = {
    pageX: 0,
    pageY: 0
  };

  constructor(
    private contextMenuService: ContextMenuService
  ) {
  }

  ngOnInit(): void {
    this.contextMenuService.contextMenu.subscribe(data => {
      this.openMenu(data);
    });
    fromEvent(document.body, 'mousemove').subscribe((e: MouseEvent) => {
      this.currentCursorPosition.pageX = e.pageX;
      this.currentCursorPosition.pageY = e.pageY;
    });
  }

  openMenu(data: ContextMenuItem[]) {
    this.currentMenuItems = data;
    this.contextMenu.nativeElement.style['display'] = 'block';
    this.contextMenu.nativeElement.style['position'] = 'absolute';
    this.contextMenu.nativeElement.style['left'] = this.currentCursorPosition.pageX + 'px';
    this.contextMenu.nativeElement.style['top'] = this.currentCursorPosition.pageY + 'px';
  }

  @HostListener('document:click', ['$event'])
  clickedOutside($event) {
    this.contextMenu.nativeElement.style['display'] = 'none';
  }

}
