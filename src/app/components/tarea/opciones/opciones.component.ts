import { Component, OnInit, Input } from '@angular/core';
import { TareaModalService } from './../../../core/services/tarea-modal.service';
import { Juego } from "../../../core/models/juego.model";
import { LocalStorageService } from "../../../core/services/local-storage.service";
import { Reto } from "../../../core/models/reto.model";





@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss']
})
export class OpcionesComponent implements OnInit {

  @Input() reto: Reto;
  juegoActual: Juego;


  juegos: Juego[] = [
    { id: 1, 'name': 'bunny', 'selected': false },
    { id: 2, 'name': 'volando', 'selected': false },
    { id: 3, 'name': 'pompas', 'selected': false },
    { id: 4, 'name': 'pizzero', 'selected': false },
    { id: 5, 'name': 'memcolor', 'selected': false },
    { id: 6, 'name': 'cubo', 'selected': false }];

  constructor(private localStorage: LocalStorageService, public tareaModalService: TareaModalService) { }




  ngOnInit(): void {

    this.reto = this.localStorage.getSeleccion();
    this.juegoActual = this.reto.juegosSeleccionados[0];
  }


  cambiarJuego(juego) {
    this.juegoActual = juego;
  }

  guardarCambios(juego: Juego) {
    this.reto.juegosSeleccionados = null;
    this.reto.juegosSeleccionados = [this.juegoActual];
    this.localStorage.setSeleccion(this.reto);
    this.closeModal();
  }

  closeModal() {
    let modal = document.getElementById("modal");
    modal.classList.add("fadeOut");
    modal.classList.remove("fadeIn");
    setTimeout(() => this.tareaModalService.close(), 800);
  }

  log() {
    console.log(...arguments)
  };

}
