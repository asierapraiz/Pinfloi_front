import { ElementRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { TareaService } from './../services/tarea.service';
import { slideInAnimation } from './../../../animations/slide-animation';
import TareaUtils from './../tarea-utils';

@Component({
  selector: 'app-suma',
  templateUrl: './suma.component.html',
  animations: [slideInAnimation],
  // attach the fade in animation to the host (root) element of this component

  styleUrls: ['./suma.component.scss']
})
export class SumaComponent extends TareaUtils implements OnInit {

  subscription!: Subscription;
  columnas!: number;
  filas!: any[];
  llevada: boolean = true;
  carton!: Element | null;


  constructor(protected ts: TareaService,
    protected elementRef: ElementRef) {
    super(ts, elementRef);
  }

  ngOnInit(): void {
    this.intentos = 0;


    if (this.llevada == true) {
      this.filas = new Array(4);
    } else {
      this.filas = new Array(3);
    }
    this.columnas = 4;
    this.creaOperacion();
    this.resuelveOperacion();
    this.muestraOperacion();
    /*
        this.ts.seleccionaOpcion$.subscribe(
          number => {   
            console.log("REcogiendo el eventodeseleccionaOpcion$");
            this.comprueba(number);        
          });*/
  }

  ngAfterViewInit() {
    this.addEventListeners();
  }  

  addEventListeners() {
    console.log("En addEventListeners");
    //Añado los eventos en los elementos de la suma
    let elementos = this.elementRef.nativeElement.querySelectorAll('.target');
    elementos.forEach((anchor: HTMLElement) => {
      anchor.addEventListener('click', this.seleccionaHueco.bind(this))
    })
  }

  creaOperacion() {

    console.log("En creaOperacion");
    if (this.llevada == true) {
      for (var f = 0; f < this.filas.length; f++) {
        this.filas[f] = new Array(this.columnas);
        for (var c = 0; c <= this.columnas; c++) {
          if (f == 0 || f == (this.filas.length - 1)) {
            this.filas[f][c] = '.';
          } else {
            if (c == 0) {
              this.filas[f][c] = '.';
            } else {
              this.filas[f][c] = this.dameNum(0, 9);
            }
          }
        }
      }
    } else {
      // console.log('En sin llevada');
      for (var f = 0; f < this.filas.length; f++) {
        this.filas[f] = new Array(this.columnas);
        for (var c = 0; c <= this.columnas; c++) {
          if (f == 0) {
            if (c == 0) {
              this.filas[f][c] = '.';
            } else {
              this.filas[f][c] = this.dameNum(0, 9);
            }
          } else if (f == 1) {
            if (c == 0) {
              this.filas[f][c] = '.';
            } else {
              let sumandoAnt = this.filas[0][c];
              var a;

              if (sumandoAnt == 9) {
                a = 0;
              } else if (sumandoAnt == 8) {
                a = Math.floor(Math.random() * (9 - sumandoAnt)) + 0;
              } else {
                a = Math.floor(Math.random() * (9 - sumandoAnt)) + 1;
              }
              this.filas[f][c] = a;
            }
          } else if (f == 2) {
            this.filas[f][c] = '.';
          }
        }
      }
    }
  }

  //Funcion para calcular los valores del resultado
  resuelveOperacion() {
    console.log("En resuelveOperacion");

    for (var c = (this.columnas); c > 0; c--) {
      var suma = 0;
      for (var x = this.filas.length - 2; x >= 0; x--) {
        if (this.filas[x][c] != '.') {
          suma += this.filas[x][c];
        }
      }
      //Si la suma es mayor que 9....
      if (suma > 9) {
        //Separo las decenas
        var decenas = Math.floor(suma / 10);
        //Si  es el último valor lo pongo al lado dela unidad
        if (c == 1) {
          this.filas[this.filas.length - 1][c - 1] = decenas;
        } else {
          //Si no es el ultimo valor, lo preparo para las llevadas.
          this.filas[0][c - 1] = decenas;
        }
        //Pongo las unidades            
        suma = suma - (decenas * 10);
        this.filas[this.filas.length - 1][c] = suma;
      } else { //SI la suma es menor que 10
        this.filas[this.filas.length - 1][c] = suma;
      }
    }
    for (var f = 0; f < this.filas.length; f++) {
      var fila = "";
      for (var c = 0; c <= this.columnas; c++) {
        fila += this.filas[f][c] + " ";
      }
      fila = "";
    }
  }

  muestraOperacion() {
    this.htmlToAdd = '';
    console.log("En muestraOperacion");
    this.carton = document.querySelector('#carton');
    if (this.carton) {
      this.carton.classList.add("suma");
      this.carton.classList.add("ancho-" + (this.columnas + 1));
      this.carton.classList.add("alto-" + this.filas.length);
    }

    for (var f = 0; f < this.filas.length; f++) {
      //Creo las filas.
      let fila = "<div id='f" + f + "' class='fila'>";

      for (var c = 0; c <= this.columnas; c++) {
        //Creo el contenido de de cada fila
        let bloque;
        if (f == 0 && this.llevada == true) {
          if (this.filas[f][c] == ".") {
            fila += "<p class='item llevada vacio' ></p>";
          } else {
            fila += "<p  id='" + f + "" + c + "' class='item llevada target' data-valor='" + this.filas[f][c] + "' ></p>";
          }
        }
        else if (f < this.filas.length - 1) {
          if (f == 2 && c == 0 && this.llevada == true) {
            fila += "<p class='item' >+</p>";
          } else if (f == 1 && c == 0 && this.llevada == false) {
            fila += "<p class='item' >+</p>";
          } else if (this.filas[f][c] == ".") {
            fila += "<p class='item' ></p>";
          } else {
            fila += "<p id='" + f + "" + c + "'class='item' >" + this.filas[f][c] + "</p>";
          }
        } else {
          if (this.filas[f][c] != ".") {
            fila += "<p id='" + f + "" + c + "'class='item resultado target' data-valor='" + this.filas[f][c] + "'></p>";
          } else {
            fila += "<p class='item vacio'  data-valor='.'></p>";
          }
        }
      }
      //Cierro la fila
      fila += "</div>";

      //Añado la línea
      if (f == this.filas.length - 1) {
        this.htmlToAdd += "<div  class='fila tiza'></div>";
      }

      //Añado la fila      
      this.htmlToAdd += fila;
    }

  }

}
