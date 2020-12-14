import { HostListener, Component, OnInit } from '@angular/core';
import { Juego } from "./models/juego.model";
import { Tarea } from "./models/tarea.model";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';
import { JsonPipe, ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  

  tareas: Tarea[] = [
    { id: 1, 'name': 'amigos', 'selected': false },
    { id: 2, 'name': 'suma1', 'selected': false },
    { id: 3, 'name': 'suma', 'selected': false },
    { id: 4, 'name': 'sumaCon', 'selected': false },
    { id: 5, 'name': 'resta' , 'selected': false},
    { id: 6, 'name': 'restaCon', 'selected': false },
    { id: 7, 'name': 'tablas', 'selected': false },
    { id: 8, 'name': 'tablas2' , 'selected': false},
    { id: 9, 'name': 'multiplicarDeUno' , 'selected': false},
    { id: 10, 'name': 'multiplicarDeDos' , 'selected': false},
    { id: 11, 'name': 'dividir', 'selected': false },
    { id: 12, 'name': 'dividirDeDos', 'selected': false }
  ];

  juegos: Juego[] = [
    { id: 1, 'name': 'bunny', 'selected': false },
    { id: 2, 'name': 'volando', 'selected': false },
    { id: 3, 'name': 'pompas', 'selected': false },
    { id: 4, 'name': 'pizzero', 'selected': false },
    { id: 5, 'name': 'memcolor', 'selected': false },
    { id: 6, 'name': 'cubo' , 'selected': false}];

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
    this.juegoSelected && this.tareaSelected?this.openModal(landingModal):
    this.juegoSelected?this.viewportScroller.scrollToAnchor('tareas'):
    this.viewportScroller.scrollToAnchor('juegos');    
  }

  addTarea(tarea) {
    
      if (this.tareasSeleccionadas.indexOf(tarea) !== -1) {
        this.tareasSeleccionadas.splice(this.tareasSeleccionadas.indexOf(tarea), 1);
        this.tareasSeleccionadas = this.tareasSeleccionadas.filter(({ id }) => id!== tarea.id); 
        tarea.selected=false;
      }else{
        tarea.selected=true;
        this.tareasSeleccionadas.push(tarea);
      }
      if(this.tareasSeleccionadas.length>0){
        this.tareaSelected = true;
      }else{
        this.tareaSelected = false;
      }

      console.log(JSON.stringify(this.tareasSeleccionadas));
      console.log("Tareas selected =>"+this.tareaSelected);
    
  }

  addJuego(juego) {
    
    if (this.juegosSeleccionados.indexOf(juego) !== -1) {
      this.juegosSeleccionados.splice(this.juegosSeleccionados.indexOf(juego), 1);
      this.juegosSeleccionados = this.juegosSeleccionados.filter(({ id }) => id!== juego.id); 
      juego.selected=false;
    }else{
      juego.selected=true;
      this.juegosSeleccionados.push(juego);
    }
    if(this.juegosSeleccionados.length>0){
      this.juegoSelected = true;
    }else{
      this.juegoSelected = false;
    }

    console.log(JSON.stringify(this.juegosSeleccionados));
    console.log("Jueago selected =>"+this.juegoSelected);
  
}

openModal(element) {
  if(this.juegosSeleccionados.length==0 || this.tareasSeleccionadas.length==0){
    return;
  }  
  this.modalService.open(element, {  
  }); 
}

seguir(element){
  this.modalService.dismissAll();
  localStorage.setItem('tareas', JSON.stringify(this.tareasSeleccionadas));
  localStorage.setItem('juegos', JSON.stringify(this.juegosSeleccionados));

  this.router.navigateByUrl('/nombre');
}

scroll(target){
  this.viewportScroller.scrollToAnchor(target);
}




 

}
