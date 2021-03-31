import { HostBinding, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Avatar } from '../avatar-form/avatar.model';
import { Reto } from "../../core/models/reto.model";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { Juego } from "../../core/models/juego.model";
import { Tarea } from "../../core/models/tarea.model";
import { flyInFromLeft, PAGE_IN_ANIMATION, PAGE_OUT_ANIMATION, JUMP_TO_TAREA_ANIMATION } from '../../animations';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, stagger, query, useAnimation } from '@angular/animations';



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
  todoOK: boolean = false;
  /*
    public avatar: Avatar = {
      definido: false,
      pelo: 'pelo_1',
      cejas: 'cejas_1',
      ojos: 'ojo_1',
      nariz: 'nariz_1',
      boca: 'boca_1',
      cara: 'cara_1',
      torso: 'torso_1'
    };*/

  reto!: Reto;

  constructor(private modalService: NgbModal, private ls: LocalStorageService, private router: Router) { }


  ngOnInit(): void {

    this.ls.getSeleccion() ? this.reto = this.ls.getSeleccion() : null;

    if (this.reto.nombre != '' &&
      this.reto.avatar != '' &&
      this.reto.tareasSeleccionadas.length > 0 &&
      this.reto.juegosSeleccionados.length > 0
    ) {
      this.todoOK = true;
    }
  }

  continuar(resumnenModal) {

    this.reto.tareaActual = 0;
    this.reto.juegoActual = 0;
    this.ls.setSeleccion(this.reto);
    this.ls.clearTablasHechas();
    this.router.navigateByUrl('/tarea');


    // setTimeout(() => {
    //   this.router.navigateByUrl('/tarea/' + this.ls.getSeleccion().tareasSeleccionadas[this.reto.tareaActual].name);

    // }, 3000);
    /*
    if (this.reto.nombre == '' ||
      this.reto.avatar['definido'] == false ||
      this.reto.tareasSeleccionadas.length > 0 ||
      this.reto.juegosSeleccionados.length > 0
    ) {
      debugger;
      this.router.navigateByUrl('/tarea/' + this.ls.getSeleccion().tareasSeleccionadas[this.reto.tareaActual].name);

    } else {
      this.openModal(resumnenModal);
    }*/



  }

  openModal(resumnenModal) {
    this.modalService.open(resumnenModal, {
    });
  }

}
