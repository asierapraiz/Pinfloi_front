import { ElementRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TareaService } from './../services/tarea.service';
import { routeAnimations } from './../../../animations/index';
import TareaUtils from './../tarea-utils';


@Component({
  selector: 'app-resta',
  templateUrl: './resta.component.html',
  styleUrls: ['./resta.component.scss'],
  animations: [routeAnimations]
  //host: { '[@routeAnimations]': '' },

})
export class RestaComponent extends TareaUtils implements OnInit {


  intentos: number = 0;
  carton!: Element;
  llevada: boolean = false;
  resultado = new Array(3);

  constructor(protected ts: TareaService,
    protected elementRef: ElementRef) {
    super(ts, elementRef);
  }

  ngOnInit(): void {

    this.intentos = 0;
    this.filas = new Array(3);
    this.columnas = 4;
    this.creaOperacion();
    this.resuelveOperacion();
    this.muestraOperacion();

  }


  ngAfterViewInit() {
    this.addEventListeners();

    let huecos = this.elementRef.nativeElement.querySelectorAll('.target');

    huecos.forEach((hueco: HTMLElement) => {
      hueco.addEventListener('click', this.marcaRelacionados.bind(this))
    })
  }

  creaOperacion() {
    var rest1;
    var rest2;

    if (this.llevada == true) {

      switch (this.columnas) {
        case 2:
          rest1 = this.dameNum(50, 95);
          rest1 = rest1 + "";
          rest2 = this.dameNum(15, 49);
          rest2 = rest2 + "";
          break;

        case 3:
          rest1 = this.dameNum(500, 955);
          rest1 = rest1 + "";
          rest2 = this.dameNum(150, 499);
          rest2 = rest2 + "";
          break;
        case 4:
          rest1 = this.dameNum(5000, 9555);
          rest1 = rest1 + "";
          rest2 = this.dameNum(1500, 4999);
          rest2 = rest2 + "";
          break;
        case 5:
          rest1 = this.dameNum(50000, 95555);
          rest1 = rest1 + "";
          rest2 = this.dameNum(15000, 49999);
          rest2 = rest2 + "";
          break;
      }

    } else {

      //Me aseguro que los números inferiores son menores.
      rest1 = new Array(this.columnas);
      rest2 = new Array(this.columnas);

      for (var a = 0; a <= this.columnas - 1; a++) {
        let num;
        do {
          num = this.dameNum(4, 9);
        } while (num == 0)
        rest1[a] = num;
        rest2[a] = this.dameNum(0, rest1[a]);
      }
      //rest1 = rest1.join('');
      //rest2 = rest2.join('');
    }



    //Bucle para crear las filas
    for (var f = 0; f < 3; f++) {

      this.filas[f] = new Array(this.columnas);
      this.resultado[f] = new Array(this.columnas);

      //Bucle para crear las this.columnas en cada fila
      for (var c = 0; c < this.columnas; c++) {

        if (f == 0) {
          this.filas[f][c] = rest1[c];
          this.resultado[f][c] = rest1[c];
        } else if (f == 1) {

          this.filas[f][c] = rest2[c];
          this.resultado[f][c] = rest2[c];

        } else if (f == 2) {
          this.filas[f][c] = '.';
          this.resultado[f][c] = '.';
        }
      }
    }

    //Pinto la operacion en el lateral
    for (var f = 0; f < 3; f++) {
      var fila = "";

      for (var c = 0; c < this.columnas; c++) {

        fila += this.filas[f][c] + " ";
      }
      console.log(fila);
      fila = "";
    }

    //Devuelvo el array bidimensional con la operacion
    return this.filas;
  }

  resuelveOperacion() {

    var resta = 0;

    for (var c = this.columnas; c >= 0; c--) {
      //Si el valor de arriba es menor, le sumo 10
      if (this.resultado[0][c] < this.resultado[1][c]) {
        this.resultado[0][c] = parseInt(this.resultado[0][c]) + 10;
        this.resultado[1][c - 1] = parseInt(this.resultado[1][c - 1]) + 1;
      }
      resta = parseInt(this.resultado[0][c]) - parseInt(this.resultado[1][c]);
      this.resultado[2][c] = resta;
    }

    //Pinto la operacion en el lateral
    console.log("El resultado");
    for (var f = 0; f < 3; f++) {
      var fila = "";

      for (var c = 0; c < this.columnas; c++) {

        fila += this.resultado[f][c] + " ";
      }
      console.log(fila);
      fila = "";
    }

  }

  muestraOperacion() {

    this.carton = document.querySelector('#carton');
    if (this.carton) {
      this.carton.classList.add("resta");
      this.carton.classList.add("ancho-" + (this.columnas + 1));
      this.carton.classList.add("alto-" + this.filas.length);
    };


    for (var f = 0; f < 3; f++) {
      //Creo las filas.
      var fila = "<div id='f" + f + "' class='fila '>";

      f == 1 ? fila += "<p  class='item'>-</p>" : fila += "<p  class='item'></p>";


      for (var c = 0; c < this.columnas; c++) {

        if (f == 0) {
          fila += "<p id='" + f + "" + c + "' class='item'>" + this.filas[f][c] + "</p>";


        } else if (f == 1) {
          fila += "<p id='" + f + "" + c + "' class='item'>" + this.filas[f][c] + "</p>";

        } else {

          fila += "<p id='" + f + "" + c + "' class='resultado item  target' data-valor='" + this.resultado[f][c] + "' ></p>";

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

  marcaRelacionados(elemento) {

    this.limpiaRelacionados();

    var fila = elemento.target.id[0];
    var columna = elemento.target.id[1];

    if (fila == 3) {
      //Si es el último valor...
      if (columna == 0 || columna == 1) {
        if (columna == "0") {
          document.getElementById(elemento.target.id).classList.add("relacionados");

          document.getElementById((this.columnas + 1) + "1").classList.add("relacionados");
          for (var a = this.columnas; a >= 1; a--) {
            document.getElementById(a + "1").classList.add("relacionados");
            document.getElementById("01").classList.add("parpadea");
          }
        } else {
          document.getElementById(elemento.target.id).classList.add("relacionados");
          document.getElementById((this.columnas + 1) + "0").classList.add("relacionados");
          for (var a = this.columnas; a >= 1; a--) {
            document.getElementById(`${a}${columna}`).classList.add("relacionados");
            document.getElementById("0" + columna).classList.add("parpadea");
          }
        }
      } else {
        document.getElementById(elemento.target.id).classList.add("relacionados");
        document.getElementById("0" + (columna - 1)).classList.add("relacionados");
        for (var a = this.columnas; a >= 1; a--) {
          document.getElementById(`${a}${columna}`).classList.add("relacionados");
          document.getElementById("0" + columna).classList.add("parpadea");
        }
      }
    } else if (fila == 0) {
      document.getElementById(elemento.target.id).classList.add("relacionados");
      document.getElementById((this.columnas + 1) + (columna + 1)).classList.add("relacionados");
      for (var a = this.columnas; a >= 1; a--) {
        document.getElementById(`${a}${(columna + 1)}`).classList.add("relacionados");
      }
    } else if (fila == 2) { //Si es una suma sin llevada
      //document.getElementById(elemento.target.id).classList.add("relacionados");
      document.getElementById("1" + columna).classList.add("relacionados");
      document.getElementById("0" + columna).classList.add("relacionados");

    }
  }


}
