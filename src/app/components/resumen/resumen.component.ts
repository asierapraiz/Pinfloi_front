import { HostBinding, Component, OnInit } from '@angular/core';
import { Avatar } from '../avatar-form/avatar.model';
import { Reto } from "../../core/models/reto.model";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { Juego } from "../../core/models/juego.model";
import { Tarea } from "../../core/models/tarea.model";
import { flyInFromLeft, PAGE_IN_ANIMATION, PAGE_OUT_ANIMATION, JUMP_TO_TAREA_ANIMATION } from '../../animations';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, stagger, query, useAnimation } from '@angular/animations';
import { AuthService } from '../usuarios/service/auth.service';




@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
  animations: [
    trigger('jump_to_tarea', [
      //transition(':enter', useAnimation(PAGE_IN_ANIMATION)),
      transition(':leave', useAnimation(JUMP_TO_TAREA_ANIMATION))
    ]),
  ]
})
export class ResumenComponent implements OnInit {

  tareasSeleccionadas: Tarea[] = [];
  juegosSeleccionados: Array<Juego> = [];
  nombre: String;
  todoOK: boolean = true;
  mensaje: String = "Comienza tu aventura y aprende jugando"


  reto!: Reto;

  constructor(private authService: AuthService, private ls: LocalStorageService, private router: Router) { }


  ngOnInit(): void {

    this.ls.getSeleccion() ? this.reto = this.ls.getSeleccion() : null;

    if (!this.authService.isAuthenticated()) {
      this.ls.sessionGetAvatar() ? "" : this.mensaje = "Te falta seleccionar el nombre";
      this.ls.sessionGetNombre() ? "" : this.mensaje = "Te falta seleccionar el avatar";

      !this.reto.juegosSeleccionados || this.reto.juegosSeleccionados.length == 0 ? this.mensaje = "Te falta seleccionar un juego" : "";
      !this.reto.tareasSeleccionadas || this.reto.tareasSeleccionadas.length == 0 ? this.mensaje = "Te falta seleccionar tareas" : "";

      if (!this.ls.sessionGetAvatar ||
        !this.ls.sessionGetNombre() ||
        !this.reto.tareasSeleccionadas ||
        !this.reto.juegosSeleccionados ||
        this.reto.tareasSeleccionadas.length == 0 ||
        this.reto.juegosSeleccionados.length == 0) {
        this.todoOK = false;
      }

    } else {

      !this.reto.juegosSeleccionados || this.reto.juegosSeleccionados.length == 0 ? this.mensaje = "Te falta seleccionar un juego" : "";
      !this.reto.tareasSeleccionadas || this.reto.tareasSeleccionadas.length == 0 ? this.mensaje = "Te falta seleccionar tareas" : "";


      if (!this.reto.tareasSeleccionadas ||
        !this.reto.juegosSeleccionados ||
        this.reto.tareasSeleccionadas.length == 0 ||
        this.reto.juegosSeleccionados.length == 0) {
        this.todoOK = false;
      }
    }





    /*  if (this.reto.nombre != '' ||
       this.reto.avatar != '' ||
       this.reto.tareasSeleccionadas != null ||
       this.reto.tareasSeleccionadas.length > 0 ||
       this.reto.juegosSeleccionados.length > 0
     ) {
       this.todoOK = false;
     } */
  }

  continuar(resumnenModal) {

    this.reto.tareaActual = 0;
    this.reto.juegoActual = 0;
    this.ls.setSeleccion(this.reto);
    this.ls.clearTablasHechas();
    this.router.navigateByUrl('/tarea');
  }

}
