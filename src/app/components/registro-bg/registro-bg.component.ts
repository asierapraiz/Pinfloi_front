import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './../../animations';



@Component({
  selector: 'app-registro-bg',
  templateUrl: './registro-bg.component.html',
  styleUrls: ['./registro-bg.component.scss'],
  animations: [routeAnimations]
})
export class RegistroBgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepRouteTransition(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
  }

}
