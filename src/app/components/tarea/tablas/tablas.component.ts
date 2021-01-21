import { ElementRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TareaService } from './../services/tarea.service';
import { routeAnimations } from './../../../animations/index';
import TareaUtils from './../tarea-utils';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent extends TareaUtils implements OnInit {

  ladel: number = 3;
  aciertos: number;
  source: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  lista: number[];
  listaMezclada: number[];
  showOpciones: boolean = false;
  opciones: number[] = [2, 3, 4, 5];
  opcionSeleccionada: number;


  constructor(
    protected ts: TareaService,
    private renderer: Renderer2,
    protected elementRef: ElementRef) {
    super(ts, elementRef);
  }

  ngOnInit(): void {
    this.intentos = 0;
    this.columnas = 4;

    this.lista = this.source.slice(0, 5);
    this.listaMezclada = this.lista;
    this.shuffle(this.listaMezclada);



    // this.creaOperacion();
    // this.resuelveOperacion();
    // this.muestraOperacion();

  }
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  ngAfterViewInit() {
    this.addEventListeners();

    let huecos = this.elementRef.nativeElement.querySelectorAll('.opcion');

    huecos.forEach((hueco: HTMLElement) => {
      hueco.addEventListener('click', this.creaElementos.bind(this))
    })
  }






  //Creo los elementos en la pantalla.
  creaElementos(element) {

    this.ladel = element.target.getAttribute('data-ladel');

    this.showOpciones = false;
    this.aciertos = 0;
    this.renderer.addClass(element.target, 'asier');

    // document.querySelector(".dragable").remove();




  }
}
