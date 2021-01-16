import { Component, OnInit } from '@angular/core';
import { Avatar } from './../avatar-form/avatar.model';
import { Seleccion } from "../../core/models/seleccion.model";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { Juego } from "../../core/models/juego.model";
import { Tarea } from "../../core/models/tarea.model";
import { flyInFromLeft } from './../../animations';
import { Router } from '@angular/router';
import { debug } from 'console';



@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss', './../../../styles/scss/auth.scss']
})
export class ResumenComponent implements OnInit {

  tareasSeleccionadas: Tarea[] = [];
  juegosSeleccionados: Array<Juego> = [];
  nombre: String;

  public avatar: Avatar = {
    definido: false,
    pelo: 'pelo_1',
    cejas: 'cejas_1',
    ojos: 'ojo_1',
    nariz: 'nariz_1',
    boca: 'boca_1',
    cara: 'cara_1',
    torso: 'torso_1'
  };

  seleccion!: Seleccion;



  constructor(private ls: LocalStorageService, private router: Router) { }

  ngOnInit(): void {

    this.ls.getSeleccion() ? this.seleccion = this.ls.getSeleccion() : null;

    if (this.ls.getSeleccion().avatar && this.ls.getSeleccion().avatar.definido == true) {
      console.log("Hay avatar");
      this.avatar = this.ls.getSeleccion().avatar;

      let elements = document.getElementsByClassName('d-none');
      while (elements.length > 0) {
        elements[0].classList.remove("d-none");
      }
      document.querySelector('#indefinido-aside').classList.add("d-none");

    }
    this.ls.getSeleccion().nombre ? this.nombre = this.ls.getSeleccion().nombre : '';

    this.ls.getSeleccion().tareasSeleccionadas ? this.tareasSeleccionadas = this.ls.getSeleccion().tareasSeleccionadas : '';
    this.ls.getSeleccion().juegosSeleccionados ? this.juegosSeleccionados = this.ls.getSeleccion().juegosSeleccionados : '';


  }

  continuar() {
    this.seleccion.tareaActual = 0;

    this.router.navigateByUrl('/tarea/' + this.ls.getSeleccion().tareasSeleccionadas[this.seleccion.tareaActual].name);
  }

}
