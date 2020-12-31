import { Component } from '@angular/core';
import { slideInAnimation } from './animations/slide-animation';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slideInAnimation ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular';

  curso: string = "Angular con Spring 5";

  profesor: string = "Andrés Guzmán"
}
