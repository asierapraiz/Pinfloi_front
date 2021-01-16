import { ElementRef, HostBinding, Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { routeAnimations, flyInOut } from './../../../animations';
import { TareaService } from './../services/tarea.service';
import { Avatar } from '../../../core/models/avatar.model';
import { Tarea } from '../../../core/models/tarea.model';
import { LocalStorageService } from "./../../../core/services/local-storage.service";
import { Seleccion } from "../../../core/models/seleccion.model";





@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  animations: [routeAnimations, flyInOut],
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {


  subscription!: Subscription;
  errores: number = 0;
  intentos: number = 1;
  showComponent: boolean = true;
  inputs!: number;
  huecoSeleccionado: any;
  aciertos: number = 0;


  avatar: Avatar;
  tareasSeleccionadas: Tarea[];
  tarea: Tarea;
  user: string;

  seleccion: Seleccion = {
    nombre: '',
    avatar: {},
    tareasSeleccionadas: [],
    juegosSeleccionados: []
  }


  constructor(private ts: TareaService,
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private ls: LocalStorageService,) {
  }

  ngOnInit(): void {
    this.ls.getSeleccion() ? this.seleccion = this.ls.getSeleccion() : this.noHaySeleccion();

    this.avatar = this.seleccion.avatar;
    this.tareasSeleccionadas = this.seleccion.tareasSeleccionadas;
    this.user = this.seleccion.nombre;
  }

  ngAfterViewInit() {
    //Añado los eventos en los elementos de las opciones
    let opciones = this.elementRef.nativeElement.querySelectorAll('.draggable');
    opciones.forEach((anchor: HTMLElement) => {
      anchor.addEventListener('click', this.seleccionaOpcion.bind(this))
    })


    this.ts.seleccionaHueco$.subscribe(
      (hueco) => {
        this.huecoSeleccionado = hueco;
      }
    );

    this.inputs = document.getElementsByClassName("target").length;

  }

  noHaySeleccion() {
    alert("NO hay seleccion");
  }

  seleccionaOpcion(opcion: any) {
    if (!this.huecoSeleccionado) {
      alert("NO hay un hueco seleccionado");
    }

    if (opcion.target.attributes['data-valor'].value == this.huecoSeleccionado.attributes['data-valor'].value) {

      this.huecoSeleccionado.classList.remove('acertado');
      this.huecoSeleccionado.classList.add('acierto');
      this.huecoSeleccionado.innerHTML = opcion.target.attributes['data-valor'].value;
    } else {
      this.huecoSeleccionado.classList.remove('acierto');
      this.huecoSeleccionado.classList.add('error');
      this.huecoSeleccionado.innerHTML = opcion.target.attributes['data-valor'].value;

      this.errores++;
      if (this.errores > 2) {
        //alert("Has fallado tres veces tendrás que empezar otra vez.");
        this.errores = 0;
        this.intentos++;
        setTimeout(() => {
          this.router.navigate(['./mensaje'], { relativeTo: this.route });
        }, 2000);

      }

    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }


}