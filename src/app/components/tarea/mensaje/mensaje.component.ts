import { Component, OnInit } from '@angular/core';
import { routeAnimations } from './../../../animations/index';
import { TareaService } from './../services/tarea.service';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from "../../../core/services/local-storage.service";
import swal from 'sweetalert2';




@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  animations: [routeAnimations],
  host: { '[@routeAnimations]': '' },
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {

  constructor(private ls: LocalStorageService, private ts: TareaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    swal('Error Upload: ', 'Mejor si lo intentas de nuevo.', 'error');

    setTimeout(() => {
      let s = this.ls.getSeleccion();
      //this.router.navigateByUrl('/tarea/' + s.tareasSeleccionadas[s.tareaActual].name);
      this.router.navigateByUrl('/tarea/' + s.tareasSeleccionadas[s.tareaActual].name);
    }, 3000);


  }

}
