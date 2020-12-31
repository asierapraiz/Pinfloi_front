import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import { slideInAnimation } from './../../../animations/slide-animation';
import { TareaService } from './../services/tarea.service';


@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  animations: [slideInAnimation],
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {

  subscription!: Subscription;
  errores: number = 0;
  intentos: number = 1;


  constructor(private ts: TareaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.ts.addItemToBasket$.subscribe(
      errores => {
        this.errores=errores;        
        if(this.errores == 3){          
          console.log("ya es tres");
          //this.ts.reset();
          this.errores=0;
          this.intentos++;   
          this.router.navigate(['./mensaje'], { relativeTo: this.route });       
          
        }
      });      
      
  }  

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }


}
