import { ElementRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TareaService } from './../services/tarea.service';
import { routeAnimations } from './../../../animations/index';
import TareaUtils from './../tarea-utils';

@Component({
  selector: 'app-suma-con',
  templateUrl: './suma-con.component.html',
  styleUrls: ['./suma-con.component.scss']
})

export class SumaConComponent extends TareaUtils implements OnInit {

  subscription!: Subscription;
  llevada: boolean = true;



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

  }

  ngAfterViewInit() {
    this.addEventListeners();

    let huecos = this.elementRef.nativeElement.querySelectorAll('.target');

    huecos.forEach((hueco: HTMLElement) => {
      hueco.addEventListener('click', this.marcaRelacionados.bind(this))
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

    //Pinto la operacion en el lateral
    for (var f = 0; f < 3; f++) {
      var fila = "";

      for (var c = 0; c < this.columnas; c++) {

        fila += this.filas[f][c] + " ";
      }
      console.log(fila);
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
            fila += "<p  id='" + f + "" + c + "' class='item llevada input ' data-valor='" + this.filas[f][c] + "' ></p>";
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////         
  //////////////////////////////////////     MARCA RELACIONADOS    //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  marcaRelacionados(elemento) {

    this.limpiaRelacionados();
    var fila = elemento.target.id[0];
    var columna = elemento.target.id[1];

    var llevada = 0;
    var decena = 0;
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
