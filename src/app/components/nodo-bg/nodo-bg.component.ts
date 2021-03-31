import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './../../animations';



@Component({
  selector: 'app-nodo-bg',
  templateUrl: './nodo-bg.component.html',
  styleUrls: ['./nodo-bg.component.scss'],
  animations: [routeAnimations]
})
export class NodoBgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepRouteTransition(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
    //return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }



}
