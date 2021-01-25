import { ElementRef, HostBinding, Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { routeAnimations, flyInOut } from './../../../animations';
import { TareaService } from './../services/tarea.service';
import { Avatar } from '../../../core/models/avatar.model';
import { Tarea } from '../../../core/models/tarea.model';
import { LocalStorageService } from "./../../../core/services/local-storage.service";
import { Seleccion } from "../../../core/models/seleccion.model";
import swal from 'sweetalert2';





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
  huecoSeleccionado: Element;
  aciertos: number = 0;
  showDragables: boolean;
  tablasHechas: number[] = [];


  avatar: Avatar;
  tareasSeleccionadas: Tarea[];
  tarea: string = 'restaCon';
  user: string;

  seleccion: Seleccion = {
    nombre: '',
    avatar: {},
    tareasSeleccionadas: [],
    juegosSeleccionados: [],
    tareaActual: 0,
    juegoActual: 0
  }


  constructor(private ts: TareaService,
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private ls: LocalStorageService) {


    this.seleccion = this.ls.getSeleccion();
    this.tarea = this.seleccion.tareasSeleccionadas[this.seleccion.tareaActual].name;
    this.router.navigate(['./' + `${this.tarea}`], { relativeTo: this.route });
    if (this.tarea == 'tablas') {
      this.showDragables = false;
    }
  }

  ngOnInit(): void {

    this.ls.getSeleccion() ? this.seleccion = this.ls.getSeleccion() : this.noHaySeleccion();

    this.ls.getTablasHechas() ? this.tablasHechas = this.ls.getTablasHechas() : '';

    this.avatar = this.seleccion.avatar;
    this.tareasSeleccionadas = this.seleccion.tareasSeleccionadas;
    this.user = this.seleccion.nombre;
    //this.tarea = this.seleccion.tareasSeleccionadas[this.seleccion.tareaActual].name;

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

    this.ts.seleccionaOpcion$.subscribe(
      (opcion) => {
        this.seleccionaOpcion(opcion);
      }
    );

    this.ts.tablaHecha$.subscribe(
      (ladel) => {
        this.tablasHechas.push(ladel);
        this.ls.setTablasHechas(this.tablasHechas);
        this.ajugar();
      }
    );

    this.inputs = document.getElementsByClassName("input").length + document.getElementsByClassName("target").length;

  }

  noHaySeleccion() {
    alert("NO hay seleccion");
  }

  actualizaJuego() {
    let next: number;
    this.seleccion.juegoActual + 1 == this.seleccion.juegosSeleccionados.length ? next = 0 : next = this.seleccion.juegoActual + 1;

    return next;
  }

  actualizaTarea() {
    let next: number;
    this.seleccion.tareaActual + 1 == this.seleccion.tareasSeleccionadas.length ? next = 0 : next = this.seleccion.tareaActual + 1;

    return next;
  }

  seleccionaOpcion(opcion: any) {


    if (!this.huecoSeleccionado || this.huecoSeleccionado.classList.contains('acierto')) {
      return;
    }

    if (this.huecoSeleccionado.classList.contains('llevada')) {

      this.huecoSeleccionado.innerHTML = opcion.target.attributes['data-valor'].value;

    } else if (this.huecoSeleccionado.classList.contains('target')) {

      this.huecoSeleccionado.innerHTML = opcion.target.attributes['data-valor'].value;

    } else if (this.huecoSeleccionado.classList.contains('input')) {

      let resultado = parseInt(opcion.target.attributes['data-valor'].value) + parseInt(this.huecoSeleccionado.textContent);
      this.huecoSeleccionado.innerHTML = '' + resultado;

    }

    if (this.huecoSeleccionado.textContent == this.huecoSeleccionado.attributes['data-valor'].value) {

      if (parseInt(this.huecoSeleccionado.textContent) > 9) {
        this.huecoSeleccionado.classList.add('font-size-min');
      }
      //this.huecoSeleccionado.classList.remove('acertado');
      this.huecoSeleccionado.classList.add('acierto');
      this.aciertos++;
      if (this.aciertos == this.inputs) {
        //Muestro modal y navego a juego
        this.ajugar();

      }
    } else {
      this.huecoSeleccionado.classList.remove('acierto');
      this.huecoSeleccionado.classList.add('error');


      this.errores++;
      if (this.errores > 2) {

        setTimeout(() => {
          this.errores = 0;
          this.intentos++;
          this.router.navigate(['./mensaje'], { relativeTo: this.route });
        }, 2000);

      }
    }

    this.limpiaRelacionados();

  }
  ajugar() {
    setTimeout(() => {
      swal({
        title: 'Muy bienn!',
        text: `Te mereces una partida.`,
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Vamos!',
      }).then((result) => {
        setTimeout(() => {
          this.seleccion.tareaActual = this.actualizaTarea();
          this.seleccion.juegoActual = this.actualizaJuego();
          this.ls.setSeleccion(this.seleccion);
          this.router.navigateByUrl('/juego/' + this.seleccion.juegosSeleccionados[this.seleccion.juegoActual].name);
        }, 500);
      });
    }, 1500);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  limpiaRelacionados() {
    //Limpio
    let relacionados = document.getElementsByClassName('relacionados');
    while (relacionados.length > 0) {
      relacionados[0].classList.remove("relacionados");
    }
  }
}
