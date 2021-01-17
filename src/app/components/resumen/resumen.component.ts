import { HostBinding, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Avatar } from './../avatar-form/avatar.model';
import { Seleccion } from "../../core/models/seleccion.model";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { Juego } from "../../core/models/juego.model";
import { Tarea } from "../../core/models/tarea.model";
import { flyInFromLeft, PAGE_IN_ANIMATION, PAGE_OUT_ANIMATION, JUMP_TO_TAREA_ANIMATION } from './../../animations';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, stagger, query, useAnimation } from '@angular/animations';



@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss', './../../../styles/scss/auth.scss'],
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

  constructor(private modalService: NgbModal, private ls: LocalStorageService, private router: Router) { }


  ngOnInit(): void {

    this.ls.getSeleccion() ? this.seleccion = this.ls.getSeleccion() : null;


  }

  continuar(resumnenModal) {
    debugger;
    this.seleccion.tareaActual = 0;

    // setTimeout(() => {
    //   this.router.navigateByUrl('/tarea/' + this.ls.getSeleccion().tareasSeleccionadas[this.seleccion.tareaActual].name);

    // }, 3000);
    if (this.seleccion.nombre != '' ||
      this.seleccion.avatar != '' ||
      this.seleccion.tareasSeleccionadas.length > 0 ||
      this.seleccion.juegosSeleccionados.length > 0
    ) {
      this.openModal(resumnenModal);
    }


  }

  openModal(resumnenModal) {
    this.modalService.open(resumnenModal, {
    });
  }

}
