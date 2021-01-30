import { ElementRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TareaService } from './../services/tarea.service';
import { routeAnimations } from './../../../animations/index';
import TareaUtils from './../tarea-utils';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-multiplicar',
  templateUrl: './multiplicar.component.html',
  styleUrls: ['./multiplicar.component.scss']
})
export class MultiplicarComponent extends TareaUtils implements OnInit {

  usados = [];
  noRepetir = [];
  difcultad = "desconocida";
  ok1 = false;
  ok2 = false;
  carton!: Element;
  multiplicadorLista = new Array();
  multiplicandoLista = new Array();
  multiplicando = "4";
  multiplicador = 1;
  numFilas = 4;
  dificultad = "medio";
  columnas = parseInt(this.multiplicando) + 1;
  filas = new Array(4);
  inputs = 0;
  acertados = 0;
  errores = 0;
  maxErrores = 3;

  constructor(protected ts: TareaService,
    protected elementRef: ElementRef) {
    super(ts, elementRef);
  }

  ngOnInit(): void {

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

    var min;
    var max;
    var multiplicadores = this.columnas - this.multiplicador;

    switch (this.dificultad) {
      case "desconocida":
        min = 1;
        max = 9;
        break;
      case "baja":
        min = 1;
        max = 3;
        break;
      case "media":
        min = 3;
        max = 7;
        break;
      case "alta":
        min = 7;
        max = 9;
        break;
    }


    //Creo un array por cada fila

    for (let fila = 0; fila < this.numFilas; fila++) {
      //Segun que tipo de fila sea, se rrellena de una u otra forma
      this.filas[fila] = new Array(this.columnas);
      if (fila == 0 || fila == 3) {

        for (let columna = 0; columna < this.columnas; columna++) {
          this.filas[fila][columna] = '.';
        }

      } else if (fila == 1) {
        this.filas[fila][0] = '.';
        this.multiplicandoLista.push(0);

        for (let columna = 1; columna < this.columnas; columna++) {
          this.multiplicandoLista;

          var num = this.dameNumEx(2, 9, this.multiplicandoLista);
          this.filas[fila][columna] = num;
          this.multiplicandoLista.push(num);
        }
      } else if (fila == 2) {

        for (var columna = 0; columna < multiplicadores; columna++) {
          this.filas[fila][columna] = '.';
          this.multiplicadorLista.push(0);
        }
        for (var columna = this.columnas - this.multiplicador; columna < this.columnas; columna++) {
          let num = this.dameNum(1, 9);
          this.filas[fila][columna] = num;
          this.multiplicadorLista.push(num);
        }
      }
    }

    //Muestro por consola
    this.muestraPorConsola();

  }

  resuelveOperacion() {
    //Recorro las fila
    for (let fila = this.filas[0].length - 1; fila >= this.filas[0].length - (this.filas[0].length - 1); fila--) {

      var resultado = (parseInt(this.filas[1][fila]) * parseInt(this.filas[2][this.filas[0].length - 1]));

      //Si hay llevada la sumo
      if (this.filas[0][fila] != ".") {
        resultado = resultado + this.filas[0][fila];
      }

      if (resultado > 9) {
        //Separo las decenas
        var decenas = Math.floor(resultado / 10);
        //Si  es el último valor lo pongo al lado dela unidad
        if (fila == this.filas[0].length - (this.filas[0].length - 1)) {
          this.filas[3][fila - 1] = decenas;
        } else {
          //Si no es el ultimo valor, lo preparo para las llevadas.
          this.filas[0][fila - 1] = decenas;
        }
        //Pongo las unidades			
        resultado = resultado - (decenas * 10);

        this.filas[3][fila] = resultado;

      } else {//Siel resultado es menor de 10        				
        this.filas[3][fila] = resultado;
      }
    }
    this.muestraPorConsola();
  }

  muestraPorConsola() {
    for (var f = 0; f <= 3; f++) {
      var fila = "";
      for (var c = 0; c < this.filas[0].length; c++) {
        fila += this.filas[f][c] + " ";
      }
      console.log(fila);
      fila = "";
    }
  }


  muestraOperacion() {


    this.carton = document.querySelector('#carton');

    if (this.carton) {
      this.carton.classList.add("deUno");
    };

    for (var f = 0; f < this.numFilas; f++) {
      //Creo las filas.
      var fila = "<div id='f" + f + "' class='fila '>";

      for (var c = 0; c < this.filas[0].length; c++) {

        //Creo el contenido de de cada fila
        if (f == 0) {
          if (this.filas[f][c] == ".") {
            fila += "<p class='item vacio llevada'></p>";

          } else {
            fila += "<p id='" + f + "" + c + "' class='item llevada target' data-valor='" + this.filas[f][c] + "' ></p>";

          }

        } else if (f == 1) {
          if (this.filas[f][c] == ".") {
            fila += "<p class='item '></p>";

          } else {
            fila += "<p id='" + f + "" + c + "' class='item' >" + this.filas[f][c] + "</p>";

          }


        } else if (f == 2) {
          if (c == ((this.filas[f].length) - this.multiplicador) - 1) {
            fila += "<p class='item'>x</p>";

          } else {
            if (c < (this.filas[f].length) - this.multiplicador) {
              fila += "<p class='item'></p>";

            } else {
              fila += "<p id='" + f + "" + c + "' class='item'>" + this.filas[f][c] + "</p>";

            }
          }


        } else if (f == 3) {

          if (this.filas[f][c] != ".") {
            fila += "<p id='" + f + "" + c + "' class='item noLlevada target resultado ' data-valor='" + this.filas[f][c] + "'></p>";

          } else {
            fila += "<p class='item vacio' data-valor='.'></p>";

          }

        }

      }
      //Cierro la fila
      fila += "</div>";

      //Añado la línea fila la fila 2
      if (f == this.filas.length - 1) {
        this.htmlToAdd += "<div  class='fila tiza'></div>";
      }
      //Añado la fila
      this.htmlToAdd += fila;
    }


    if (this.columnas > 6) {
      var cuantos = 6;
    } else {
      var cuantos = (this.columnas - 2);
    }



  }


  marcaRelacionados(elemento) {

    this.limpiaRelacionados();

    var fila = elemento.target.id[0];
    var columna = parseInt(elemento.target.id[1]);

    var llevada;
    var decena;
    let multiplicando = "1";
    let multiplicador = "2" + (this.filas[0].length - 1);


    if (fila == 0) {
      let resultado = "3" + (columna + 1);
      multiplicando += (columna + 1);
      decena = "0" + columna;//soy yo
      document.getElementById(resultado).classList.add("relacionados");
      document.getElementById("3" + (columna + 1)).classList.add("seleccionado");
      document.getElementById(decena).classList.add("seleccionado");

      if (this.filas[0][columna + 1] != '.') {
        document.getElementById('0' + (columna + 1)).classList.add("relacionados");
      }

    } else {
      //Si es el último y resulado es > 10
      if (columna == this.filas[0].length - (this.filas[0].length - 1)) {

        llevada = "0" + columna;
        decena = "3" + (columna - 1);
        multiplicando += columna;
        document.getElementById(elemento.target.id).classList.add("seleccionado");
      } else if (columna == 0) {

        multiplicando += (columna + 1);
        document.getElementById('31').classList.add("relacionados");
        document.getElementById(elemento.target.id).classList.add("seleccionado");

        if (this.filas[0][columna + 1] != '.') {
          llevada = "0" + (columna + 1);
          document.getElementById(llevada).classList.add("relacionados");
        }

      } else {

        if (this.filas[0][columna - 1] != '.') {
          llevada = "0" + (columna - 1);
          document.getElementById(llevada).classList.add("relacionados");
        }

        multiplicando += columna;
        document.getElementById(elemento.target.id).classList.add("seleccionado");
      }

      //Este es común para todos los casos
      if (this.filas[0][columna] != '.') {
        llevada = "0" + columna;
        document.getElementById(llevada).classList.add("relacionados");
      }
    }



    document.getElementById(multiplicando).classList.add("relacionados");
    document.getElementById(multiplicador).classList.add("relacionados");



  }

}
