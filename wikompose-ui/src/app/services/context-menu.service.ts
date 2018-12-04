import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ContextMenuItem {
  label: string;
  action: () => void;
}

@Injectable()
export class ContextMenuService {

  private _contextMenu = new Subject<ContextMenuItem[]>();

  get contextMenu(): Observable<ContextMenuItem[]> {
    return this._contextMenu.asObservable();
  }

  public open(menu: ContextMenuItem[]) {
    this._contextMenu.next(menu);
    return false;
  }

}
