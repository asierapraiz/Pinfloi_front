import { HostListener, Component, OnInit } from '@angular/core';
import { Juego } from "../../core/models/juego.model";
import { Tarea } from "../../core/models/tarea.model";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../usuarios/service/auth.service';
import swal from 'sweetalert2';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {



  tareas: Tarea[] = [
    { 'name': 'amigos', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'suma1', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'suma', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'sumaCon', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'resta', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'restaCon', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'tablas', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'tablas2', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'multiplicarDeUno', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'dividir', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'dividirDeDos', 'selected': false, 'cantidad': 0, 'valoracion': null }
  ];

  juegos: Juego[] = [
    { id: 1, 'name': 'bunny', 'selected': false },
    { id: 2, 'name': 'volando', 'selected': false },
    { id: 3, 'name': 'pompas', 'selected': false },
    { id: 4, 'name': 'pizzero', 'selected': false },
    { id: 5, 'name': 'memcolor', 'selected': false },
    { id: 6, 'name': 'cubo', 'selected': false }];

  constructor(public authService: AuthService,
    private localStorage: LocalStorageService,
    private modalService: NgbModal,
    private viewportScroller: ViewportScroller,
    private router: Router) { }



  ngOnInit(): void {
  }


  tareasSeleccionadas: Tarea[] = [];
  tareasParaModal: Array<Tarea> = [];
  juegosSeleccionados: Array<Juego> = [];
  tareaSelected: boolean = false;
  juegoSelected: boolean = false;
  closeResult: string;
  isScrolled: boolean;

  @HostListener("window:scroll")
  scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
  }

  addTarea(event) {
    var target = event.currentTarget;
    var idAttr = target.attributes.id.nodeValue;
    let operacion = idAttr.split("-")[0];
    let tarea = this.tareas.find(t => t.name === idAttr.split("-")[1]);
    if (tarea.cantidad < 6) {
      tarea.cantidad++;
      this.tareasSeleccionadas.push(Object.assign({}, tarea));
    }
    this.tareaSelected = this.tareas.find(t => t.cantidad > 0) ? true : false;
    console.log("Tareas seleccionadas =>" + JSON.stringify(this.tareasSeleccionadas));
  }

  removeTarea(event) {
    var target = event.currentTarget;
    var idAttr = target.attributes.id.nodeValue;
    let operacion = idAttr.split("-")[0];
    let tarea = this.tareas.find(t => t.name === idAttr.split("-")[1]);
    let tareaSeleccionada = this.tareasSeleccionadas.find(t => t.name === idAttr.split("-")[1]);

    if (tarea.cantidad > 0) {
      tarea.cantidad--;
      this.tareasSeleccionadas.splice(this.tareasSeleccionadas.findIndex(v => v.name === operacion), 1);
    }
    this.tareaSelected = this.tareas.find(t => t.cantidad > 0) ? true : false;
    console.log("Tareas seleccionadas =>" + JSON.stringify(this.tareasSeleccionadas));

  }

  public onClick(landingModal) {
    //Recalculo e id de las tareas por el indice
    /* 
    this.tareasSeleccionadas.map((t, index) => {
      t.id = index;
      return t.name;
    });*/

    this.tareasParaModal = this.tareas.filter(function (tarea) {
      return tarea.cantidad > 0;
    });

    console.log("Tareas seleccionadas =>" + JSON.stringify(this.tareasSeleccionadas));

    //Añadir las tareas seleccionadas
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

  openModal(element) {
    if (this.juegosSeleccionados.length == 0 || this.tareasSeleccionadas.length == 0) {
      return;
    }
    this.modalService.open(element, {
    });
  }

  seguir(element) {
    this.modalService.dismissAll();
    this.localStorage.setTareas(this.tareasSeleccionadas);
    this.localStorage.setTareaActual(this.tareasSeleccionadas[0]);
    this.localStorage.setJuegos(this.juegosSeleccionados);

    this.router.navigateByUrl('/nombre');
  }

  scroll(target) {
    this.viewportScroller.scrollToAnchor(target);
  }


  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    //swal('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');

  }



}
