import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './../../animations';
import { AuthService } from '../usuarios/service/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-nodo-bg',
  templateUrl: './nodo-bg.component.html',
  styleUrls: ['./nodo-bg.component.scss'],
  animations: [routeAnimations]
})
export class NodoBgComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {

  }

  prepRouteTransition(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
    //return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }



}
