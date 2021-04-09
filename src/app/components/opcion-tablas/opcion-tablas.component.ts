import { Component, OnInit } from '@angular/core';
import { OpcionTablasService } from './../../core/services/opcion-tablas.service';

@Component({
  selector: 'app-opcion-tablas',
  templateUrl: './opcion-tablas.component.html',
  styleUrls: ['./opcion-tablas.component.scss']
})
export class OpcionTablasComponent implements OnInit {

  constructor(public opcionTablasService: OpcionTablasService) { }

  ngOnInit(): void {
  }

  tablas: String[] = ["x1", "x2", "x3", "x4", "x5"];

  addTabla(tabla) {

    this.opcionTablasService.addTabla(tabla.currentTarget.id);

    /* if (tabla.currentTarget.classList.contains("seleccionado")) {
      tabla.currentTarget.classList.remove("seleccionado");
      this.opcionTablasService.removeTabla(tabla.currentTarget.id);
    } else {
      tabla.currentTarget.classList.add("seleccionado");
      this.opcionTablasService.addTabla(tabla.currentTarget.id);
    } */

  }

  close() {
    let modal = document.getElementById("modal");
    modal.classList.add("fadeOut");
    modal.classList.remove("fadeIn");
    setTimeout(() => this.opcionTablasService.close(), 800);
  }

}
