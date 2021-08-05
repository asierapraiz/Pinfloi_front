import { Component, OnInit, Input } from '@angular/core';
import { Tarea } from './../../core/models/tarea.model';

@Component({
  selector: 'app-valoracion-icon',
  templateUrl: './valoracion-icon.component.html',
  styleUrls: ['./valoracion-icon.component.scss']
})
export class ValoracionIconComponent implements OnInit {

  @Input() tarea: Tarea;
  iconType: String;
  intentos: any[];
  constructor() { }

  ngOnInit(): void {

    if (this.tarea.valoracion != null && this.tarea.valoracion.intentos != null) {
      this.intentos = Array(this.tarea.valoracion.intentos - 1).fill(4); // [4,4,4,4,4]

      switch (this.tarea.valoracion.nota) {
        case 3:
          this.iconType = "fa-check";
          break;
        case 2:
          this.iconType = "fa-exclamation";
          break;
        case 1:
          this.iconType = "fa-times";
          break;
      }
    }






  }

}
