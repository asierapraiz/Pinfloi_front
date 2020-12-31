import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private addItemToBasketSource = new Subject<number>();
  addItemToBasket$ = this.addItemToBasketSource.asObservable();

  private resetChild = new Subject();
  reset$ = this.resetChild.asObservable();
  
  addItemToBasket(text: number) {    
    this.addItemToBasketSource.next(text);
  }

  reset(){
    console.log("En el servicio");
    this.resetChild.next();
  }
     
}
