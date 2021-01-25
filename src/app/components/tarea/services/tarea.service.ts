import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private addIntentoSource = new Subject<number>();
  addIntento$ = this.addIntentoSource.asObservable();

  private seleccionaHuecoSource = new Subject<any>();
  seleccionaHueco$ = this.seleccionaHuecoSource.asObservable();

  private seleccionaOpcionSource = new Subject<any>();
  seleccionaOpcion$ = this.seleccionaOpcionSource.asObservable();

  private tablaHechaSource = new Subject<number>();
  tablaHecha$ = this.tablaHechaSource.asObservable();

  private resetChild = new Subject();
  reset$ = this.resetChild.asObservable();

  tablaHecha(text: number) {
    this.tablaHechaSource.next(text);
  }
  seleccionaHueco(value: any) {
    console.log("En selecciona hueco del servicio :" + value.attributes['data-valor'].value);
    this.seleccionaHuecoSource.next(value);
  }

  seleccionaOpcion(value: any) {
    console.log("En selecciona opcion del servicio :" + value.target.attributes['data-valor'].value);
    this.seleccionaOpcionSource.next(value);
  }

  reset() {
    console.log("En el servicio");
    this.resetChild.next();
  }

}
