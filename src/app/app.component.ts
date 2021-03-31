import { Component } from '@angular/core';
import { routeAnimations, fadeInAnimation } from './animations/index';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [routeAnimations, fadeInAnimation],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular';

  curso: string = "Angular con Spring 5";

  profesor: string = "Andrés Guzmán"

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
