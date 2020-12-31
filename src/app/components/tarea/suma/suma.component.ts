import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Subscription }   from 'rxjs';
import { TareaService } from './../services/tarea.service';
import { slideInAnimation } from './../../../animations/slide-animation';

@Component({
  selector: 'app-suma',
  templateUrl: './suma.component.html',
  animations: [slideInAnimation],
  // attach the fade in animation to the host (root) element of this component
  
  styleUrls: ['./suma.component.scss']
})
export class SumaComponent implements OnInit {

  subscription!: Subscription;
  intentos: number = 0;

  constructor(private ts: TareaService ) { }

  OnInit(){
    this.intentos=0;
  }

  ngOnInit(): void {

    this.subscription = this.ts.reset$.subscribe(
      
      ()=>{
        console.log("En suma");     
        
      }
      );   
    
  }
  suma() {
    this.intentos++;
    this.ts.addItemToBasket(this.intentos);
  }
}
