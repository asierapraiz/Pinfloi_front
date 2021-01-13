import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { routeAnimations } from './../../animations';
import { trigger, transition, style, animate, query, group, animateChild } from '@angular/animations';

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
    ]),
  ]
})
export class SeleccionComponent implements OnInit {


  constructor(private _router: Router) { }

  ngOnInit(): void {

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
