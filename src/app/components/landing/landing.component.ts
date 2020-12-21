import { HostListener, Component, OnInit } from '@angular/core';
import { Juego } from "./models/juego.model";
import { Tarea } from "./../../models/tarea.model";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JsonPipe, ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {



  tareas: Tarea[] = [
    { id: 1, 'name': 'amigos', 'selected': false, 'cantidad': 0 },
    { id: 2, 'name': 'suma1', 'selected': false, 'cantidad': 0 },
    { id: 3, 'name': 'suma', 'selected': false, 'cantidad': 0 },
    { id: 4, 'name': 'sumaCon', 'selected': false, 'cantidad': 0 },
    { id: 5, 'name': 'resta', 'selected': false, 'cantidad': 0 },
    { id: 6, 'name': 'restaCon', 'selected': false, 'cantidad': 0 },
    { id: 7, 'name': 'tablas', 'selected': false, 'cantidad': 0 },
    { id: 8, 'name': 'tablas2', 'selected': false, 'cantidad': 0 },
    { id: 9, 'name': 'multiplicarDeUno', 'selected': false, 'cantidad': 0 },
    { id: 11, 'name': 'dividir', 'selected': false, 'cantidad': 0 },
    { id: 12, 'name': 'dividirDeDos', 'selected': false, 'cantidad': 0 }
  ];

  juegos: Juego[] = [
    { id: 1, 'name': 'bunny', 'selected': false },
    { id: 2, 'name': 'volando', 'selected': false },
    { id: 3, 'name': 'pompas', 'selected': false },
    { id: 4, 'name': 'pizzero', 'selected': false },
    { id: 5, 'name': 'memcolor', 'selected': false },
    { id: 6, 'name': 'cubo', 'selected': false }];

  constructor(private modalService: NgbModal, private viewportScroller: ViewportScroller, private router: Router) {

  }

  ngOnInit(): void {
  }


  tareasSeleccionadas: Array<Tarea> = [];
  juegosSeleccionados: Array<Juego> = [];
  tareaSelected: boolean = false;
  juegoSelected: boolean = false;
  closeResult: string;
  isScrolled: boolean;

  @HostListener("window:scroll")
  scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
  }

  public onClick(landingModal): void {
    //Incluyo en tareas selecionadas las tareas de la lista tareas que tengas catidad>0
    this.tareasSeleccionadas = this.tareas.filter(function(tarea, index, arr){ 
      return tarea.cantidad>0;
    });
    console.log(JSON.stringify(this.tareasSeleccionadas));

    //Añadir loas tares a tareas seleccionadas
    this.juegoSelected && this.tareaSelected ? this.modalService.open(landingModal) :
      this.juegoSelected ? this.viewportScroller.scrollToAnchor('tareas') :
        this.viewportScroller.scrollToAnchor('juegos');
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

  modificaCantidadTarea(event) {
    var target = event.currentTarget;
    var idAttr = target.attributes.id.nodeValue;
    let tarea = this.tareas.find(t => t.name === idAttr.split("-")[1]);
    let operacion = idAttr.split("-")[0];
    if (operacion == 'suma' && tarea.cantidad < 6) {
      tarea.cantidad++;
    } else if (operacion == 'resta' && tarea.cantidad > 0) {
      tarea.cantidad--;
    }
    this.tareaSelected = this.tareas.find(t => t.cantidad > 0) ? true : false;

  }

  openModal(element) {
    if (this.juegosSeleccionados.length == 0 || this.tareasSeleccionadas.length == 0) {
      return;
    }
    this.modalService.open(element, {
    });
  }

  seguir(element) {
    this.modalService.dismissAll();
    localStorage.setItem('tareas', JSON.stringify(this.tareasSeleccionadas));
    localStorage.setItem('juegos', JSON.stringify(this.juegosSeleccionados));

    this.router.navigateByUrl('/nombre');
  }

  scroll(target) {
    this.viewportScroller.scrollToAnchor(target);
  }






}
