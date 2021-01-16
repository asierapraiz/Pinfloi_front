import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { routeAnimations } from './../../animations';
import { trigger, transition, style, animate, query, group, animateChild } from '@angular/animations';
import { Juego } from "../../core/models/juego.model";
import { Tarea } from "../../core/models/tarea.model";
import { SeleccionService } from './services/seleccion.service';
import { flyInFromLeft } from './../../animations';
import { Avatar } from './../avatar-form/avatar.model';
import { Seleccion } from "../../core/models/seleccion.model";
import { LocalStorageService } from "../../core/services/local-storage.service";





const SHARED_ANIMATION_STYLES = [
  style({ position: 'relative', height: '!' }),

  query(':enter, :leave', [
    style({ position: 'absolute', left: 0, top: 0, width: '100%' })
  ]),

  query(':enter', style({ opacity: 0 }))
];
/*
const PAGE_ANIMATIONS = [
  { title: 'Page Animations', fileName: '/assets/code/routing-page-animations.example-ts' },
  { title: 'Route Change Right', fileName: '/assets/code/routing-page-change-right.example-ts' },
  { title: 'Route Change Left', fileName: '/assets/code/routing-page-change-left.example-ts' }
];
*/

const NICE_EASING = 'cubic-bezier(0.35, 0, 0.25, 1)';

const rutas = [
  {
    'actual': '/seleccion/tareas',
    'before': '/landing',
    'next': '/seleccion/juegos'
  },
  {
    'actual': '/seleccion/juegos',
    'before': '/seleccion/tareas',
    'next': '/seleccion/nombre'
  },
  {
    'actual': '/seleccion/nombre',
    'before': '/seleccion/juegos',
    'next': '/seleccion/avatar'
  },
  {
    'actual': '/seleccion/avatar',
    'before': '/seleccion/nombre',
    'next': '/seleccion/resumen'
  },
  {
    'actual': '/seleccion/resumen',
    'before': '/seleccion/avatar',
    'next': '/tarea'
  }
];




@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition(':enter', []),
      transition(':increment', [
        ...SHARED_ANIMATION_STYLES,
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100%)' }),
        ]),
        query(':leave', [
          animateChild(),
        ]),
        group([
          query(':leave', [
            animate('1s ' + NICE_EASING, style({ transform: 'translateX(-100%)', opacity: 0 }))
          ]),
          query(':enter', [
            animate('0.5s 0.1s ' + NICE_EASING, style({ opacity: 1, transform: 'none' })),
          ]),
          query(':enter', [
            animateChild()
          ], { delay: '500ms' })
        ]),
      ]),
      transition(':decrement', [
        ...SHARED_ANIMATION_STYLES,
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-100%)' }),
        ]),
        query(':leave', [
          animateChild(),
        ]),
        group([
          query(':leave', [
            animate('1s ' + NICE_EASING, style({ transform: 'translateX(100%)', opacity: 0 }))
          ]),
          query(':enter', [
            animate('0.5s 0.1s ' + NICE_EASING, style({ opacity: 1, transform: 'none' })),
          ]),
          query(':enter', [
            animateChild()
          ], { delay: '500ms' })
        ])
      ]),
    ]), flyInFromLeft
  ]
})
export class SeleccionComponent implements OnInit {
  tareasSeleccionadas: Tarea[] = [];
  juegosSeleccionados: Array<Juego> = [];
  nombre: String;


  public avatar: Avatar = {
    definido: false,
    pelo: 'pelo_1',
    cejas: 'cejas_1',
    ojos: 'ojo_1',
    nariz: 'nariz_1',
    boca: 'boca_1',
    cara: 'cara_1',
    torso: 'torso_1'
  };

  seleccion: Seleccion = {
    nombre: '',
    avatar: {},
    tareasSeleccionadas: [],
    juegosSeleccionados: []
  }


  constructor(private ls: LocalStorageService, private ss: SeleccionService, private _router: Router) {

  }

  ngOnInit(): void {

    this.ls.getSeleccion() ? this.seleccion = this.ls.getSeleccion() : null;

    if (this.ls.getSeleccion().avatar && this.ls.getSeleccion().avatar.definido == true) {
      console.log("Hay avatar");
      this.avatar = this.ls.getSeleccion().avatar;

      let elements = document.getElementsByClassName('d-none');
      while (elements.length > 0) {
        elements[0].classList.remove("d-none");
      }
      document.querySelector('#indefinido-aside').classList.add("d-none");

    }
    this.ls.getSeleccion().nombre ? this.nombre = this.ls.getSeleccion().nombre : '';

    this.ls.getSeleccion().tareasSeleccionadas ? this.tareasSeleccionadas = this.ls.getSeleccion().tareasSeleccionadas : '';
    this.ls.getSeleccion().juegosSeleccionados ? this.juegosSeleccionados = this.ls.getSeleccion().juegosSeleccionados : '';




    this.ss.seleccionaTarea$.subscribe(
      (tarea) => {
        this.tareasSeleccionadas.push(tarea);
        this.seleccion.tareasSeleccionadas = this.tareasSeleccionadas;
        this.ls.setSeleccion(this.seleccion);
      }
    );

    this.ss.seleccionaJuego$.subscribe(
      (juego) => {
        this.juegosSeleccionados.push(juego);
        this.seleccion.juegosSeleccionados = this.juegosSeleccionados;
        this.ls.setSeleccion(this.seleccion);
      }
    );

    this.ss.seleccionaAvatar$.subscribe(
      (avatar) => {
        this.avatar = avatar;
        this.seleccion.avatar = avatar;
        this.ls.setSeleccion(this.seleccion);
      }
    );

    this.ss.seleccionaNombre$.subscribe(
      (nombre) => {
        this.nombre = nombre;
        this.seleccion.nombre = nombre;
        this.ls.setSeleccion(this.seleccion);
      }
    );

  }


  delete(tipo, index) {
    tipo == 'tarea' ? this.tareasSeleccionadas.splice(index, 1) : this.juegosSeleccionados.splice(index, 1);

    this.ls.setSeleccion(this.seleccion);

  }

  prepRouteTransition(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
  }

  get activeRoutePath(): string {
    return this._router.url;
  }



  isActiveRoute(path: string) {
    if (path.length > 1) {
      const regex = new RegExp('^' + path);
      return regex.test(this.activeRoutePath);
    }
    return path == this.activeRoutePath;
  }

  before() {
    let next = rutas.find(e => e.actual == this.activeRoutePath);
    this._router.navigate([next.before]);
  }
  next() {
    let next = rutas.find(e => e.actual == this.activeRoutePath);
    this._router.navigate([next.next]);
  }







}
