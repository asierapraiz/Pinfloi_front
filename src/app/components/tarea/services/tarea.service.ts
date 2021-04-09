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

  private addErrorSource = new Subject();
  addError$ = this.addErrorSource.asObservable();

  private addAciertoSource = new Subject();
  addAcierto$ = this.addAciertoSource.asObservable();

  private rechargeDraggableEventsSource = new Subject();
  rechargeDraggableEvents$ = this.rechargeDraggableEventsSource.asObservable();

  tablaHecha(text: number) {
    this.tablaHechaSource.next(text);
  }
  seleccionaHueco(value: any) {
    this.seleccionaHuecoSource.next(value);
  }

  seleccionaOpcion(value: any) {
    this.seleccionaOpcionSource.next(value);
  }

  addError() {
    this.addErrorSource.next();
  }

  addAcierto() {
    this.addAciertoSource.next();
  }

  reset() {
    this.resetChild.next();
  }

  reChargeDraggableEvents() {
    this.rechargeDraggableEventsSource.next();
  }


  gardarReto() {

  }

}
