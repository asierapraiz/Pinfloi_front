import { Component, HostBinding, OnInit } from '@angular/core';
import { Tarea } from "../../core/models/tarea.model";
import { SeleccionService } from './../seleccion/services/seleccion.service';



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
    { id: 1, 'name': 'amigos', 'selected': false, 'cantidad': 0 },
    { id: 2, 'name': 'suma1', 'selected': false, 'cantidad': 0 },
    { id: 3, 'name': 'suma', 'selected': false, 'cantidad': 0 },
    { id: 4, 'name': 'sumaCon', 'selected': false, 'cantidad': 0 },
    { id: 5, 'name': 'resta', 'selected': false, 'cantidad': 0 },
    { id: 6, 'name': 'restaCon', 'selected': false, 'cantidad': 0 },
    { id: 7, 'name': 'tablas-2-5', 'selected': false, 'cantidad': 0 },
    { id: 7, 'name': 'tablas-6-9', 'selected': false, 'cantidad': 0 },
    //{ id: 8, 'name': 'tablas2', 'selected': false, 'cantidad': 0 },
    { id: 9, 'name': 'multiplicarDe1', 'selected': false, 'cantidad': 0 },
    { id: 9, 'name': 'multiplicarDe2', 'selected': false, 'cantidad': 0 },
    { id: 11, 'name': 'dividir', 'selected': false, 'cantidad': 0 },
    { id: 12, 'name': 'dividirDe2', 'selected': false, 'cantidad': 0 }
  ];


  constructor(private ss: SeleccionService) { }

  ngOnInit(): void {
  }

  addTarea(tarea: any) {
    /*
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
    */


    this.ss.seleccionaTarea(tarea);



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
    this.tareasSeleccionadas.map((t, index) => {
      t.id = index;
      return t.name;
    });

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
