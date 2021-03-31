import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
//import { routeAnimations } from './../../animations';
import { trigger, transition, style, animate, query, group, animateChild } from '@angular/animations';
import { Juego } from "../../core/models/juego.model";
import { Tarea } from "../../core/models/tarea.model";
import { RetoService } from './services/reto.service';
import { flyInFromLeft } from './../../animations';
import { Avatar } from './../../core/models/avatar.model';
import { Reto } from "../../core/models/reto.model";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { AuthService } from '../usuarios/service/auth.service';
import { UsuarioService } from '../usuarios/service/usuario.service';



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

const rutas1 = [
  {
    'actual': '/reto/nodo',
    'before': '/landing',
    'next': '/reto/nodo-dos'
  },
  {
    'actual': '/reto/nodo-dos',
    'before': '/reto/nodo',
    'next': '/reto/nombre'
  },
  {
    'actual': '/reto/nombre',
    'before': '/reto/nodo-dos',
    'next': '/reto/avatar'
  },
  {
    'actual': '/reto/avatar',
    'before': '/reto/nombre',
    'next': '/reto/tareas'
  },
  {
    'actual': '/reto/tareas',
    'before': '/reto//avatar',
    'next': '/reto/juegos'
  },
  {
    'actual': '/reto/juegos',
    'before': '/reto/tareas',
    'next': '/reto/resumen'
  },
  {
    'actual': '/reto/resumen',
    'before': '/reto/avatar',
    'next': '/tarea'
  }
];

const rutas2 = [
  {
    'actual': '/reto/nodo',
    'before': '/landing',
    'next': '/reto/nodo-dos'
  },
  {
    'actual': '/reto/nodo-dos',
    'before': '/reto/nodo',
    'next': '/reto/tareas'
  },
  {
    'actual': '/reto/tareas',
    'before': '/reto/nodo',
    'next': '/reto/juegos'
  },
  {
    'actual': '/reto/juegos',
    'before': '/reto/tareas',
    'next': '/reto/resumen'
  },
  {
    'actual': '/reto/resumen',
    'before': '/reto/juegos',
    'next': '/tarea'
  }
];

@Component({
  selector: 'app-reto',
  templateUrl: './reto.component.html',
  styleUrls: ['./reto.component.scss'],
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
export class RetoComponent implements OnInit {
  tareasSeleccionadas: Tarea[] = [];
  juegosSeleccionados: Array<Juego> = [];
  nombre: String = "";
  hasNext: boolean = true;
  public avatar: Avatar = new Avatar();
  reto: Reto = new Reto();
  rutas = rutas1;


  constructor(private usuarioService: UsuarioService, private authService: AuthService, private ls: LocalStorageService, private retoService: RetoService, private _router: Router) {

  }

  ngOnInit(): void {

    this.mostrarUsuario();

    //Reviso si ya hay reto
    /* 
        this.reto = this.ls.getSeleccion();
        if (this.reto != null) {
          this.reto.tareasSeleccionadas = [];
          this.reto.juegosSeleccionados = [];
          this.reto.tareaActual = 0;
          this.reto.juegoActual == 0;
          this.ls.setSeleccion(this.reto);
        }
        if (this.reto.avatar != null) {
          this.rutas = rutas2;
          this.avatar = this.reto.avatar;
        } else {
          this.rutas = rutas1;
        }
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
     */


    /* let next = this.rutas.find(e => e.actual == this.activeRoutePath);
    this.hasNext = next.actual == '/reto/resumen' ? false : true; */

    this.makeSuscriptions();


  }
  ngAfterViewInit(): void {
    this.fixFontSize();

  }

  makeSuscriptions() {
    this.retoService.seleccionaTarea$.subscribe(
      (tarea) => {
        this.tareasSeleccionadas.push(tarea);
        this.reto.tareasSeleccionadas = this.tareasSeleccionadas;
        this.ls.setSeleccion(this.reto);
      }
    );

    this.retoService.seleccionaJuego$.subscribe(
      (juego) => {
        this.juegosSeleccionados.push(juego);
        this.reto.juegosSeleccionados = this.juegosSeleccionados;
        this.reto.juegoActual = 0;
        this.ls.setSeleccion(this.reto);
      }
    );

    this.retoService.seleccionaAvatar$.subscribe(
      (avatar) => {
        this.avatar = avatar;
        this.reto.avatar = avatar;
        this.ls.setSeleccion(this.reto);
      }
    );

    this.retoService.seleccionaNombre$.subscribe(
      (nombre) => {
        this.nombre = nombre;
        this.reto.nombre = nombre;
        this.ls.setSeleccion(this.reto);
      }
    );
  }


  delete(tipo, index) {
    tipo == 'tarea' ? this.tareasSeleccionadas.splice(index, 1) : this.juegosSeleccionados.splice(index, 1);
    this.reto.tareasSeleccionadas = this.tareasSeleccionadas;
    this.ls.setSeleccion(this.reto);

  }

  prepRouteTransition(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
  }

  get activeRoutePath(): string {
    return this._router.url;
  }


  mostrarUsuario() {

    if (this.authService.isAuthenticated()) {
      console.log("Esta autenticado");
      this.avatar = this.authService.usuario.avatar;
      this.nombre = this.authService.usuario.nombre;

    } else {
      this.avatar = this.ls.sessionGetAvatar();
      this.nombre = this.ls.sessionGetNombre();
    }

    if (this.avatar != null) {
      let elements = document.getElementsByClassName('d-none');
      while (elements.length > 0) {
        elements[0].classList.remove("d-none");
      }
      document.querySelector('#indefinido-aside').classList.add("d-none");
    }

  }

  isActiveRoute(path: string) {
    if (path.length > 1) {
      const regex = new RegExp('^' + path);
      return regex.test(this.activeRoutePath);
    }
    return path == this.activeRoutePath;
  }

  before() {
    let ruta = this.rutas.find(e => e.actual == this.activeRoutePath);
    //this.hasNext = next.before == '/reto/resumen' ? false : true;
    this._router.navigate([ruta.before]);
  }
  next() {
    let ruta = this.rutas.find(e => e.actual == this.activeRoutePath);
    //this.hasNext = next.next == '/reto/resumen' ? false : true;
    this._router.navigate([ruta.next]);
  }


  fixFontSize() {
    var len_fit = 10; // According to your question, 10 letters can fit in.
    let username = document.getElementById('username');

    // Get the lenght of user name.
    var len_user_name = username.innerText.length;
    let new_size = 8 / len_user_name;
    username.style.fontSize = new_size + "rem";

  }

}
