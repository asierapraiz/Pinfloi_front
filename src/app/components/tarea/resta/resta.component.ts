import { ElementRef, Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { TareaService } from './../services/tarea.service';
import TareaUtils from './../tarea-utils';
import { routeAnimations } from './../../../animations/index';

@Component({
  selector: 'app-resta',
  templateUrl: './resta.component.html',
  animations: [routeAnimations],
  host: { '[@routeAnimations]': '' },
  styleUrls: ['./resta.component.scss']
})
export class RestaComponent extends TareaUtils implements OnInit {


  intentos: number = 0;
  carton!: Element;

  constructor(protected ts: TareaService,
    protected elementRef: ElementRef, private router: Router, private route: ActivatedRoute) {
    super(ts, elementRef);
  }

  ngOnInit(): void {
    //this.router.navigate(['../mensaje'], { relativeTo: this.route });
    //this.addButons();
  }


  ngAfterViewInit() {
    this.addEventListeners();
  }

  addButons() {
    this.carton = document.querySelector('#carton');
    let boton = "<button data-valor='5' class='target' >Suma</button>";
    this.htmlToAdd = boton;
  }



}
