import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpcionTablasService {

  bloque1 = [1, 2, 3, 4, 5];
  bloque2 = [6, 7, 8, 9, 10];
  public bloque = [];
  public visible = false;



  constructor() { }

  private addTablaSource = new Subject<any>();
  addTabla$ = this.addTablaSource.asObservable();

  private removeTablaSource = new Subject<any>();
  removeTabla$ = this.removeTablaSource.asObservable();


  close() {
    this.visible = false;
  }

  open(bloque) {

    bloque == 5 ? this.bloque = this.bloque1 : this.bloque = this.bloque2;
    this.visible = true;
  }

  addTabla(tabla) {
    this.addTablaSource.next(tabla);
  }

  removeTabla(tabla) {
    this.removeTablaSource.next(tabla);
  }
}
