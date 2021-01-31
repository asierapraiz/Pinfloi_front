import { ElementRef, Component, OnInit } from '@angular/core';
import { TareaService } from './../services/tarea.service';
import TareaUtils from './../tarea-utils';

@Component({
  selector: 'app-multiplicar-de-dos',
  templateUrl: './multiplicar-de-dos.component.html',
  styleUrls: ['./multiplicar-de-dos.component.scss']
})
export class MultiplicarDeDosComponent extends TareaUtils implements OnInit {

  carton!: Element;
  multiplicadorLista = new Array();
  multiplicandoLista = new Array();
  multiplicando = 4;
  multiplicador = 2;
  numFilas = 8;
  dificultad = "media";
  columnas = this.multiplicando + 3;
  filas = new Array(this.numFilas);

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
    //alert(multiplicadores);
    switch (this.dificultad) {
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
    for (var f = 0; f < this.numFilas; f++) {
      //Segun que tipo de fila sea, se rrellena de una u otra forma
      this.filas[f] = new Array(this.columnas);
      if (f == 0 || f == 1 || f == 4 || f == 5 || f == 6 || f == 7) {
        for (var i = 0; i < this.columnas; i++) {
          this.filas[f][i] = '.';
        }
      } else if (f == 2) {
        for (var i = 0; i < this.columnas - this.multiplicador; i++) {
          this.filas[f][i] = '.';
          this.multiplicandoLista.push('0');
        }
        for (var i = 3; i < this.columnas; i++) {
          var c = this.dameNumEx(2, 9, this.multiplicandoLista);
          this.filas[f][i] = c;
          this.multiplicandoLista.push(c);
        }
      } else if (f == 3) {
        for (var i = 0; i < this.columnas - this.multiplicador; i++) {
          this.filas[f][i] = '.';
          this.multiplicadorLista.push(0);
        }
        for (var i = this.columnas - this.multiplicador; i < this.columnas; i++) {
          var num = this.dameNumEx(min, max, this.multiplicadorLista);
          this.filas[f][i] = num;
          this.multiplicadorLista.push(num);
        }
      }
    }
    this.muestraPorConsola();
  }

  resuelveOperacion() {

    //Multiplicador de 2 => 8 filas, columnas=> multiplicando + 3.
    //Funcion que calcula los valores del array    
    //Multiplicador de 2 => 8 filas, columnas=> multiplicando + 3.
    var cont = 1;
    for (var a = this.filas[0].length - 1; a >= this.filas[0].length - this.multiplicador; a--) {
      for (var i = this.filas[0].length - 1; i >= this.filas[0].length - (this.filas[0].length - 3); i--) {


        if (cont == 1) {
          let resultado = parseInt(this.filas[3][a]) * parseInt(this.filas[2][i]);
          if (this.filas[1][i] != ".") {
            resultado += this.filas[1][i];
          }
          if (resultado > 9) {
            var decenas = Math.floor(resultado / 10);
            if (i == this.filas[0].length - (this.filas[0].length - 3)) {
              this.filas[5][i - 1] = decenas;
            } else {
              this.filas[1][i - 1] = decenas;
            }
            resultado = resultado - (decenas * 10);
            this.filas[5][i] = resultado;
            //alert("Es nun mayor que 10:"+decenas+""+unidades);
          } else {
            if (this.filas[1][i] != ".") {
              resultado = resultado + this.filas[1][i];
            }
            this.filas[5][i] = resultado;
            //alert("Es nun numero simple:"+unidades);
          }
        } else if (cont == 2) {
          var resultado = parseInt(this.filas[3][a]) * parseInt(this.filas[2][i]);
          if (this.filas[0][i] != ".") {
            resultado = resultado + this.filas[0][i];
          }
          if (resultado > 9) {
            var decenas = Math.floor(resultado / 10);
            if (i == this.filas[0].length - (this.filas[0].length - 3)) {
              this.filas[6][i - 2] = decenas;
            } else {
              this.filas[0][i - 1] = decenas;
            }
            resultado = resultado - (decenas * 10);
            this.filas[6][i - 1] = resultado;
            //alert("Es nun mayor que 10:"+decenas+""+unidades);
          } else {
            this.filas[6][i - 1] = resultado;
            //alert("Es nun numero simple:"+unidades);
          }
        }
      }
      cont = 2;
    }
    ////////////////////////////////////////////////Rellenamos la ultima fila
    for (var a = this.filas[7].length - 1; a >= 0; a--) {
      //Sumo los dos elementos
      let resultado = this.filas[5][a] + this.filas[6][a];
      if (typeof (resultado) == "string") {
        resultado = resultado.replace(".", "");
        if (resultado == ".") {
          resultado = resultado.replace(".", "0");
        }
      }
      if (this.filas[4][a] != ".") {
        resultado = parseInt(resultado) + parseInt(this.filas[4][a]);
      }
      if (resultado > 9) {
        var decenas = Math.floor(resultado / 10);
        resultado = resultado - (decenas * 10);
        if (a == this.filas[0].length - (this.multiplicando + 1)) {
          this.filas[7][a - 1] = resultado;
          this.filas[7][a - 2] = decenas;
        } else {
          this.filas[4][a - 1] = decenas;
          this.filas[7][a] = resultado;
        }
      } else {
        this.filas[7][a] = resultado;
      }
    }
    //////////////////////////////////////////////////////Fin de última fila
    for (var f = 0; f <= 7; f++) {
      var fila = "";
      for (var c = 0; c < this.filas[0].length; c++) {
        fila += this.filas[f][c] + " ";
      }
      fila = "";
    }
    this.muestraPorConsola();
  }

  muestraOperacion() {
    console.log(this.filas[0].length);
    document.getElementById('carton').classList.add('deDos');
    for (var f = 0; f < this.numFilas; f++) {
      //Creo las filas.
      var fila = "<div id='f" + f + "' class='fila '>";
      for (var c = 0; c < this.filas[0].length; c++) {
        //Creo el contenido de de cada fila
        if (f == 0 || f == 1) {
          if (this.filas[f][c] == ".") {
            fila += "<p class='item vacio llevada'></p>";
          } else {
            fila += "<p id='" + f + "" + c + "' class='item llevada hueco target ' data-valor='" + this.filas[f][c] + "' ></p>";
          }
        } else if (f == 2) {
          if (this.filas[f][c] == ".") {
            fila += "<p class='item'></p>";
          } else {
            fila += "<p id='" + f + "" + c + "' class='item'>" + this.filas[f][c] + "</p>";
          }
        } else if (f == 3) {
          if (c == ((this.filas[f].length) - this.multiplicador) - 1) {
            fila += "<p class='item'>x</p>";
          } else {
            if (c < (this.filas[f].length) - this.multiplicador) {
              fila += "<p class='item'></p>";
            } else {
              fila += "<p id='" + f + "" + c + "' class='item'>" + this.filas[f][c] + "</p>";
            }
          }
        } else if (f == 4) {
          if (this.filas[f][c] == "." || c == this.filas[0].length - 1) {
            fila += "<p class='item'></p>";
          } else {
            fila += "<p id='" + f + "" + c + "' class='item  llevada hueco result target' data-valor='" + this.filas[f][c] + "'></p>";
          }
        } else if (f == 5) {
          if (this.filas[f][c] != ".") {
            fila += "<p id='" + f + "" + c + "' class='item  hueco result target' data-valor='" + this.filas[f][c] + "'></p>";
          } else {
            fila += "<p class='item ' data-valor='.'></p>";
          }
        } else if (f == 6) {
          if (this.filas[f][c] != ".") {
            fila += "<p id='" + f + "" + c + "' class='item  hueco result target' data-valor='" + this.filas[f][c] + "'></p>";
          } else {
            fila += "<p class='item ' data-valor='.'></p>";
          }
        } else if (f == 7) {
          if (c == 0 && this.filas[f][c] == "0") {
            fila += "<p class='item ' data-valor='.'></p>";
          } else if (c == 1 && this.filas[f][c - 1] == 0 && this.filas[7][c] == '0') {
            fila += "<p class='item ' data-valor='.'></p>";
          } else {
            fila += "<p id='" + f + "" + c + "' class='item hueco resultado target' data-valor='" + this.filas[f][c] + "' ></p>";
          }
        } else {
          fila += "<p id='" + f + "" + c + "' class='item hueco resultado target' data-valor='" + this.filas[f][c] + "'></p>";
        }
      }
      //Cierro la fila
      fila += "</div>";

      //Añado la línea fila la fila 2
      if (f == 4 || f == this.filas.length - 1) {
        this.htmlToAdd += "<div  class='fila tiza'></div>";
      }

      //Añado la fila      
      this.htmlToAdd += fila;
    }
    //La fila que no tenga elementos le añado una clase para que no se muestre;
    /*if ($("#f4 > .hueco").length == 0) {
      $("#f4").addClass('noItem');
    }*/
    if (this.columnas > 6) {
      var cuantos = 6;
    } else {
      var cuantos = this.columnas;
    }


  }

  marcaRelacionados(elemento) {
    this.limpiaRelacionados();

    var fila = elemento.target.id[0];
    var columna = parseInt(elemento.target.id[1]);
    var resultado;

    var llevada;
    var decena;
    if (this.multiplicando == 3) {
      var restaM = 3;
    } else if (this.multiplicando == 4) {
      var restaM = 2;
    } else if (this.multiplicando == 5) {
      var restaM = 1
    } else if (this.multiplicando == 6) {
      var restaM = 0
    }

    var filaMultiplicando = "2";
    var filaMultiplicador = "3";
    //Si es la primera fila de llevadas
    if (fila == 0) {
      resultado = "6" + (columna + 1);
      decena = "6" + (columna - 1);
      filaMultiplicando += (columna + 1);
      filaMultiplicador += this.filas[0].length - 2;
      //document.getElementById(resultado).classList.add("relacionados");
    } else if (fila == 1) {//Si es la segunda fila dellevadas
      resultado = "5" + (columna + 1);
      decena = "5" + (columna + 1);
      filaMultiplicando += (columna + 1);
      filaMultiplicador += this.filas[0].length - 1;
      document.getElementById(resultado).classList.add("relacionados");
    } else if (fila == 5) {
      if (columna == 2) {
        llevada = "1" + (columna + 1);
        //decena ="5"+(columna-1);
        var unidad = "5" + (columna + 1);
        filaMultiplicando += (columna + 1);
        filaMultiplicador += this.filas[0].length - 1;
        document.getElementById(unidad).classList.add("relacionados");

      } else if (columna == 3) {
        llevada = "1" + columna;
        decena = "5" + (columna - 1);
        filaMultiplicando += columna;
        filaMultiplicador += this.filas[0].length - 1;
      } else {
        llevada = "1" + columna;
        decena = "1" + (columna - 1);
        filaMultiplicando += columna;
        filaMultiplicador += (this.numFilas - restaM);
      }
    } else if (fila == 6) {
      if (columna == 1) {
        llevada = "0" + (columna + 2);
        //decena ="6"+(columna-1);
        var unidad = "6 " + (columna + 1);
        filaMultiplicando += (columna + 2);
        filaMultiplicador += (this.numFilas - (restaM + 1));
        document.getElementById(unidad).classList.add("relacionados");
      } else if (columna == 2) {
        llevada = "0" + (columna + 1);
        decena = "6" + (columna - 1);
        filaMultiplicando += (columna + 1);
        filaMultiplicador += (this.numFilas - (restaM + 1));
      } else {
        llevada = "0" + (columna + 1);
        decena = "0" + columna;
        filaMultiplicando += (columna + 1);
        filaMultiplicador += (this.numFilas - (restaM + 1));
      }
    } else if (fila == 7) {
      llevada = "4" + columna;
      decena = "4" + (columna - 1);
      filaMultiplicando = "5" + columna;
      filaMultiplicador = "6" + columna;
    }

    let yo = document.getElementById(elemento.target.id);
    yo !== null ? yo.classList.add("seleccionado") : '';

    let dec = document.getElementById(decena);
    dec !== null ? dec.classList.add("relacionados") : '';

    let fmando = document.getElementById(filaMultiplicando);
    fmando !== null ? fmando.classList.add("relacionados") : '';

    let fmdor = document.getElementById(filaMultiplicador);
    fmdor !== null ? fmdor.classList.add("relacionados") : '';

    document.getElementById(llevada).classList.add("parpadea");
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
}
