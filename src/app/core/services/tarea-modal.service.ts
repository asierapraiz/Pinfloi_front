import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaModalService {

  public visible = false;



  constructor() { }

  /* private openModalSource = new Subject<any>();
  seleccionaNombre$ = this.openModalSource.asObservable();

  private closeModalSource = new Subject<any>();
  seleccionaAvatar$ = this.closeModalSource.asObservable(); */

  close() {
    this.visible = false;
  }

  open() {
    this.visible = true;
  }
}
