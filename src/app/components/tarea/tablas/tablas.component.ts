import { ElementRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TareaService } from './../services/tarea.service';
import { routeAnimations } from './../../../animations/index';
import TareaUtils from './../tarea-utils';
import { Renderer2 } from '@angular/core';
import { LocalStorageService } from "./../../../core/services/local-storage.service";
import { flyInFromDown } from './../../../animations';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';
import { Router } from '@angular/router';








@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss'],
  animations: [
    trigger('showLista', [
      // ...
      state('open', style({

        opacity: 1,
        left: 0
      })),
      state('closed', style({

        opacity: 0,
        top: -200

      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
      transition('open <=> closed', [
        animate('0.5s')
      ]),
      transition('* => open', [
        animate('1s',
          style({ opacity: '*' }),
        ),
      ]),
      transition('* => *', [
        animate('1s')
      ]),
    ],
    ),
    trigger('showTabla', [
      // ...
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
      transition('open <=> closed', [
        animate('0.5s')
      ]),
      transition('* => open', [
        animate('1s',
          style({ opacity: '*' }),
        ),
      ]),
      transition('* => *', [
        animate('1s')
      ]),
    ],
    ),
  ],

})
export class TablasComponent extends TareaUtils implements OnInit {

  ladel: number = 3;
  aciertos: number;
  source: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  lista: number[];
  listaMezclada: number[];
  showOpciones: boolean = true;
  opcionesList: number[];
  opcionSeleccionada: number;
  opciones: Element
  tabla: Element;
  showLista: boolean = true;
  showTabla: boolean = false;


  constructor(
    private router: Router,
    protected ts: TareaService,
    private renderer: Renderer2,
    protected elementRef: ElementRef,
    private ls: LocalStorageService) {
    super(ts, elementRef);
  }

  ngOnInit(): void {
    let url = this.router.url;
    this.ladel = parseInt((url.substring(url.length - 1, url.length)));

    /* if (tipoTabla == '5') {
      this.opcionesList = [2, 3, 4, 5];
    } else {
      this.opcionesList = [6, 7, 8, 9];
    } */

    this.intentos = 0;
    this.columnas = 4;

    this.lista = this.source.slice(0, 5);
    this.listaMezclada = this.source.slice(0, 5);
    this.shuffle(this.listaMezclada);
    this.creaElementos();
  }

  toggle() {
    this.showTabla = !this.showTabla;
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  ngAfterViewInit() {

    this.addEventListeners();
    let opcionesList = this.elementRef.nativeElement.querySelectorAll('.opcion');

    this.ts.reChargeDraggableEvents();

  }

  //Creo los elementos en la pantalla.
  creaElementos() {
    this.toggle()
    this.aciertos = 0;

  }

  resultado(valor) {
    return valor * this.ladel;
  }

  opcion(opcion: any) {

    if (!this.seleccionado || this.seleccionado.classList.contains('acierto')) {
      return;
    }

    if (this.seleccionado.classList.contains('target')) {
      this.seleccionado.innerHTML = opcion.target.attributes['data-valor'].value;
    }
    //Cambio la funete pa números mayores que 10 
    if (parseInt(this.seleccionado.textContent) > 9) {
      this.seleccionado.classList.add('font-size-min');
    }

    //Si acierta
    if (this.seleccionado.textContent == this.seleccionado.attributes['data-valor'].value) {
      this.aciertos++;
      if (this.aciertos == 10) {
        this.ts.tablaHecha(this.ladel);
      }
      if (this.aciertos == 5) {
        setTimeout(() => {
          this.showTabla = !this.showTabla;
        }, 2000);
        setTimeout(() => {
          this.lista = this.source.slice(5);
          this.listaMezclada = this.source.slice(5);
          this.shuffle(this.listaMezclada);
          this.showTabla = !this.showTabla;
        }, 3000);
        setTimeout(() => {
          this.addEventListeners();
          this.ts.reChargeDraggableEvents();
        }, 3500);

      }
    }

    this.limpiaRelacionados();

  }

}
