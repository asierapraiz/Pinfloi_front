import { ElementRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TareaService } from './../services/tarea.service';
import { routeAnimations } from './../../../animations/index';
import TareaUtils from './../tarea-utils';
import { Renderer2 } from '@angular/core';
import { LocalStorageService } from "./../../../core/services/local-storage.service";
import { flyInFromDown } from './../../../animations';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';





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
  opcionesList: number[] = [2, 3, 4, 5];
  opcionSeleccionada: number;
  opciones: Element
  tabla: Element;
  huecoSeleccionado: Element;
  showLista: boolean = true;
  showTabla: boolean = false;


  constructor(
    protected ts: TareaService,
    private renderer: Renderer2,
    protected elementRef: ElementRef,
    private ls: LocalStorageService) {
    super(ts, elementRef);
  }

  ngOnInit(): void {
    console.log("ngOnOnit");

    this.intentos = 0;
    this.columnas = 4;

    //Filtro las tablas que ta estén hechas
    this.opcionesList = this.opcionesList.filter(item => !this.ls.getTablasHechas().includes("" + item));

    this.lista = this.source.slice(0, 5);
    this.listaMezclada = this.source.slice(0, 5);
    this.shuffle(this.listaMezclada);

    // this.creaOperacion();
    // this.resuelveOperacion();
    // this.muestraOperacion();
  }

  toggle() {
    this.showLista = !this.showLista;
    this.showTabla = !this.showTabla;
  }
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  ngAfterViewInit() {
    this.addEventListeners();

    let opcionesList = this.elementRef.nativeElement.querySelectorAll('.opcion');

    opcionesList.forEach((opcion: HTMLElement) => {
      opcion.addEventListener('click', this.creaElementos.bind(this))
    })

    this.tabla = document.getElementById('showTabla');
    this.opciones = document.getElementById('elijeOpcion');
  }

  seleccionaTarget(hueco) {
    this.huecoSeleccionado = null;
    this.huecoSeleccionado = hueco.target;

    if (this.seleccionado != null) {
      this.seleccionado.classList.remove('seleccionado');
    }
    this.ts.seleccionaHueco(hueco.target);
    this.seleccionado = hueco.target;
    this.seleccionado.classList.add('seleccionado');
  }

  selectDraggable(element) {
    this.opcionSeleccionada = element.target.attributes['data-valor'].value;
  }

  //Creo los elementos en la pantalla.
  creaElementos(element) {

    this.toggle()

    this.ladel = element.target.getAttribute('data-ladel');

    this.showOpciones = false;
    this.aciertos = 0;
    // this.tabla.classList.remove('out');
    // this.opciones.classList.add('out');

  }

  resultado(valor) {
    return valor * this.ladel;
  }

  seleccionaOpcion(opcion: any) {

    if (!this.huecoSeleccionado || this.huecoSeleccionado.classList.contains('acierto')) {
      return;
    }

    if (this.huecoSeleccionado.classList.contains('target')) {
      this.huecoSeleccionado.innerHTML = opcion.target.attributes['data-valor'].value;
    }

    if (this.huecoSeleccionado.textContent == this.huecoSeleccionado.attributes['data-valor'].value) {
      if (parseInt(this.huecoSeleccionado.textContent) > 9) {
        this.huecoSeleccionado.classList.add('font-size-min');
      }

      this.huecoSeleccionado.classList.add('acierto');

      this.aciertos++;

      if (this.aciertos == 10) {
        //Muestro modal y navego a juego
        //this.ls.clearTablasHechas()
        this.ts.tablaHecha(this.ladel);
      }
      if (this.aciertos == 5) {

        this.showTabla = !this.showTabla;

        setTimeout(() => {
          this.lista = this.source.slice(5);
          this.listaMezclada = this.source.slice(5);
          this.shuffle(this.listaMezclada);
          this.showTabla = !this.showTabla;
        }, 1200);

      }
    } else {
      this.huecoSeleccionado.classList.remove('acierto');
      this.huecoSeleccionado.classList.add('error');
      this.errores++;

      if (this.errores > 3) {
        /*
                setTimeout(() => {
                  this.errores = 0;
                  this.intentos++;
                  this.router.navigate(['./mensaje'], { relativeTo: this.route });
                }, 2000);*/

      }
    }

    this.limpiaRelacionados();

  }
}
