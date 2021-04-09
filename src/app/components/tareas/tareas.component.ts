import { Component, HostBinding, OnInit } from '@angular/core';
import { Tarea } from "../../core/models/tarea.model";
import { RetoService } from './../reto/services/reto.service';
import { OpcionTablasService } from './../../core/services/opcion-tablas.service';




@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {


  tareasSeleccionadas: Array<Tarea> = [];
  tareaSelected: boolean = false;
  tareasParaModal: Array<Tarea> = [];



  tareas: Tarea[] = [
    { 'name': 'amigos', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'suma1', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'suma', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'sumaCon', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'resta', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'restaCon', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'tablas-2-5', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'tablas-6-9', 'selected': false, 'cantidad': 0, 'valoracion': null },
    //{ id: 8, 'name': 'tablas2', 'selected': false, 'cantidad': 0 },
    { 'name': 'multiplicarDe1', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'multiplicarDe2', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'dividir', 'selected': false, 'cantidad': 0, 'valoracion': null },
    { 'name': 'dividirDe2', 'selected': false, 'cantidad': 0, 'valoracion': null }
  ];


  constructor(public opcionTablasService: OpcionTablasService, private ss: RetoService) { }

  ngOnInit(): void {
  }

  addTarea(tarea: any) {
    var tabla = tarea.name.substring(tarea.name.length - 1, tarea.name.length);

    if (tarea.name.includes('tablas')) {
      this.opcionTablasService.open(tabla);
    } else {
      this.ss.seleccionaTarea(tarea);
    }

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
      t.name = index;
      return t.name;
    });*/

    this.tareasParaModal = this.tareas.filter(function (tarea) {
      return tarea.cantidad > 0;
    });

    console.log("Tareas seleccionadas =>" + JSON.stringify(this.tareasSeleccionadas));

    //Añadir las tareas seleccionadas

    // this.juegoSelected && this.tareaSelected ? this.modalService.open(landingModal) :
    //   this.juegoSelected ? this.viewportScroller.scrollToAnchor('tareas') :
    //     this.viewportScroller.scrollToAnchor('juegos');

  }

}
