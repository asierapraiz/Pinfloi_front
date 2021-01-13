import { Component, HostBinding, OnInit } from '@angular/core';
import { Juego } from "../../core/models/juego.model";


@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {


  juegoSelected: boolean = false;
  juegosSeleccionados: Array<Juego> = [];

  juegos: Juego[] = [
    { id: 1, 'name': 'bunny', 'selected': false },
    { id: 2, 'name': 'volando', 'selected': false },
    { id: 3, 'name': 'pompas', 'selected': false },
    { id: 4, 'name': 'pizzero', 'selected': false },
    { id: 5, 'name': 'memcolor', 'selected': false },
    { id: 6, 'name': 'cubo', 'selected': false }];


  constructor() { }

  ngOnInit(): void {
  }

  addJuego(juego) {

    if (this.juegosSeleccionados.indexOf(juego) !== -1) {
      this.juegosSeleccionados.splice(this.juegosSeleccionados.indexOf(juego), 1);
      this.juegosSeleccionados = this.juegosSeleccionados.filter(({ id }) => id !== juego.id);
      juego.selected = false;
    } else {
      juego.selected = true;
      this.juegosSeleccionados.push(juego);
    }
    if (this.juegosSeleccionados.length > 0) {
      this.juegoSelected = true;
    } else {
      this.juegoSelected = false;
    }
    console.log(JSON.stringify(this.juegosSeleccionados));
    console.log("Jueago selected =>" + this.juegoSelected);
  }

}
