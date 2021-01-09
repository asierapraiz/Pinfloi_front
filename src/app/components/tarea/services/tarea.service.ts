import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private addIntentoSource = new Subject<number>();
  addIntento$ = this.addIntentoSource.asObservable();

  private seleccionaHuecoSource = new Subject<any>();
  seleccionaHueco$ = this.seleccionaHuecoSource.asObservable();

  private addItemToBasketSource = new Subject<number>();
  addItemToBasket$ = this.addItemToBasketSource.asObservable();

  private resetChild = new Subject();
  reset$ = this.resetChild.asObservable();
  
  addItemToBasket(text: number) {    
    this.addItemToBasketSource.next(text);
  }
  seleccionaHueco(value: any){
    console.log("En selecciona hueco del servicio :"+value.attributes['data-valor'].value);
    this.seleccionaHuecoSource.next(value);
  }

  reset(){
    console.log("En el servicio");
    this.resetChild.next();
  } 
     
}
