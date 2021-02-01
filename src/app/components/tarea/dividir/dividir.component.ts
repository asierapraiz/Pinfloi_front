import { ElementRef, Component, OnInit } from '@angular/core';
import { TareaService } from './../services/tarea.service';
import { routeAnimations } from './../../../animations/index';
import TareaUtils from './../tarea-utils';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-dividir',
  templateUrl: './dividir.component.html',
  styleUrls: ['./dividir.component.scss']
})
export class DividirComponent extends TareaUtils implements OnInit {

  divisor = 1;
  // dividendo = parametro1;
  // dificultad = parametro2;
  dividendo = 4;
  dificultad = 2;
  filas = new Array(this.dividendo + 1);
  columnas = (this.dividendo * 2) + this.divisor;


  constructor(
    private renderer: Renderer2,
    protected ts: TareaService,
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
    this.incluyeLinea();


    let huecos = this.elementRef.nativeElement.querySelectorAll('.target');

    huecos.forEach((hueco: HTMLElement) => {
      hueco.addEventListener('click', this.marcaRelacionados.bind(this))
    })

    document.getElementById('llevadas').addEventListener('click', this.seleccionaHueco.bind(this));

    document.getElementById('papelera').addEventListener('click', this.vaciaLlevadas);

  }

  vaciaLlevadas() {
    document.getElementById('llevada').innerHTML = '';
  }


  creaOperacion() {

    for (var f = 0; f < this.filas.length; f++) {
      this.filas[f] = new Array(this.columnas);
      for (var c = 0; c < this.columnas; c++) {
        if (f == 0) {
          if (c < this.dividendo) {
            var num = this.dameNum(1, 9) + "";
            this.filas[f][c] = num;
            //this.filas[f][c]='.';
          } else if (c > this.dividendo && c < (this.dividendo + this.divisor + 1)) {
            var num = this.dameNumEx(2, 9, [0]) + "";
            this.filas[f][c] = num;
            //this.filas[f][c]='.'; 
          } else {
            this.filas[f][c] = '.';
          }
        } else {
          this.filas[f][c] = '.';
        }
      }
    }

    //Para mostrar una devisión determinada
    //this.filas[0] = ['1', '6', '1', '8', '.', '5', '.', '.', '.'];

    this.muestraPorConsola();
  }

  resuelveOperacion() {


    var calcDividendo = '';
    for (var a = 0; a < this.dividendo; a++) {
      this.filas[0][a] !== '.' ? calcDividendo += this.filas[0][a] : '';
    }
    var calcDivisor = '';
    for (var a = this.dividendo + 1; a < (this.dividendo + 1) + this.divisor; a++) {
      calcDivisor = this.filas[0][a];
    }
    var resultado: string = '' + Math.floor(parseInt(calcDividendo) / parseInt(calcDivisor));


    var resto = parseInt(calcDividendo) % parseInt(calcDivisor);
    //Guardo los valores de la solucion "resultado" en la fila y casilas correspondientes.
    for (var a = this.dividendo + 1, i = 0; a < (this.dividendo + 1) + resultado.length; a++, i++) {
      this.filas[1][a] = resultado[i];
    }

    //Elimino las columnas vacias   
    //x es cuan larga es la fila 
    let x = calcDividendo.length + resultado.length + 1;

    //i es la cantidad de registros q tengo q borrar.       
    var i = this.filas[0].length - x;
    for (var a = 0; a < this.filas.length; a++) {
      this.filas[a].splice(x, i);
    }


    //Resolviendo...
    for (var f = 1, c = 0; c < resultado.length; f++, +c++) {
      var up = 0;
      //Recorro la fila hasta que el valor sea mayor que el resultado temporal.
      for (var a = 0; a < parseInt(calcDividendo); a++) {
        //Si no hay numero, lo bajo
        if (this.filas[f - 1][a] == "." && a <= calcDividendo.length) {
          this.filas[f - 1][a] = this.filas[0][a];
        }
        //Tomo el valor
        if (this.filas[f - 1][a] != 'x') {
          up += this.filas[f - 1][a];
        }
        //Si es divisible
        if (up >= parseInt(calcDivisor)) {
          //Coloco los ceros anteriores.
          for (var n = a; n >= 0; n--) {
            this.filas[f][n] = 'x';
          }
          //Coloco el resto
          this.filas[f][a] = up % parseInt(calcDivisor);

          //Si siguen habiendo numeros, los bajo.
          if (this.filas[0][a + 1] != '.') {
            this.filas[f][a + 1] = this.filas[0][a + 1];
          }
          break;
        }
      }
    }

    this.muestraPorConsola();

  }

  muestraOperacion() {


    document.getElementById('carton').classList.add('division');

    for (var f = 0; f < this.filas.length; f++) {
      //Creo las filas.
      var fila = "<div id='f" + f + "' class='fila'>";
      for (var c = 0; c < this.filas[0].length; c++) {
        //Creo el contenido de de cada fila
        if (f == 0) {
          if (this.filas[f][c] == '.') {
            fila += "<p class='item '></p>";
          } else {
            if (c <= this.dividendo) {
              fila += "<p id='" + f + "" + c + "' class='item draggable'  data-resultado='" + this.filas[f][c] + "' >" + this.filas[f][c] + "</p>";
            } else {
              fila += "<p id='" + f + "" + c + "' class='item' >" + this.filas[f][c] + "</p>";
            }
          }
        } else if (f < this.filas.length) {
          if (this.filas[f][c] == "x" || this.filas[f][c] == '.') {
            fila += "<p class='item'></p>";
          } else {
            fila += "<p id='" + f + "" + c + "' class='item box resultado hueco target' data-valor='" + this.filas[f][c] + "' ></p>";
          }
        }
      }
      //Cierro la fila
      fila += "</div>";

      //Añado la fila      
      this.htmlToAdd += fila;
    }
  }

  incluyeLinea() {

    let id = "0" + (this.dividendo + 1);
    let a = document.getElementById(id);
    a.classList.add('relative');

    const linea = document.createElement('div');
    linea.classList.add('absolute');
    linea.id = 'lineaDiv';
    this.renderer.appendChild(a, linea);
  }

  marcaRelacionados(elemento) {


    this.limpiaRelacionados();

    var fila = (elemento.target.id)[0];
    var columna = (elemento.target.id)[1];
    var llevada = 0;
    var decena = 0;
    //Marco el elemento seleccionado
    let yo = document.getElementById(elemento.target.id);
    yo !== null ? yo.classList.add("seleccionado") : '';


    //Si el el primer digito del resultado...
    if (fila == 1 && columna == (this.dividendo + 1)) {

      //Si el primer digito del dividendo es mayor que el divisor
      if (parseInt(document.getElementById('00').textContent) >= parseInt(document.getElementById('0' + (this.dividendo + 1)).textContent)) {
        document.getElementById('00').classList.add('relacionados');
        document.getElementById('10').classList.add('relacionados');
        //document.getElementById('11').classList.add('relacionados');
      } else { //Si el primer digito del dividendo es menor que el divisor
        //Creo la txapela
        // var txapela = "<img id='txapela' src='img/txapela.png'>";
        //var txapela="<div id='txapela'>";
        //Añado la txapela
        // document.getElementById('00').classList.add('relative').append(txapela);
        //document.getElementById('txapela').fadeIn();
        //Marco los elementos de la fila 0
        document.getElementById('00').classList.add('relacionados');
        document.getElementById('01').classList.add('relacionados');

        //Marco los elementos de la fila 1
        document.getElementById('11').classList.add('relacionados');
        //document.getElementById('12').classList.add('relacionados');
      }
    }


    //El segundo dígito del resultado
    if (fila == 1 && columna == (this.dividendo + 2)) {

      if (document.getElementById(elemento.target.id).getAttribute('data-valor') == '0') {
        document.getElementById('12').classList.add('relacionados');
      } else {
        let a = document.getElementById('10');
        //Si el valor divisible es el segundo
        if (a != null && document.getElementById('10').getAttribute('data-valor') != '0') {
          document.getElementById('11').classList.add('relacionados');
          document.getElementById('10').classList.add('relacionados');
          document.getElementById('21').classList.add('relacionados');
          document.getElementById('22').classList.add('relacionados');
        } else if (a != null && document.getElementById('10').getAttribute('data-valor') == '0') {
          if (document.getElementById('12') != null && document.getElementById('12').getAttribute('data-valor') != null) {
            document.getElementById('11').classList.add('relacionados');
            document.getElementById('12').classList.add('relacionados');
            document.getElementById('21').classList.add('relacionados');
            document.getElementById('22').classList.add('relacionados');
          } else {
            document.getElementById('11').classList.add('relacionados');
            document.getElementById('21').classList.add('relacionados');
            document.getElementById('22').classList.add('relacionados');
          }
        } else if (document.getElementById('12').getAttribute('data-valor') != null) {
          document.getElementById('11').classList.add('relacionados');
          document.getElementById('12').classList.add('relacionados');
          document.getElementById('22').classList.add('relacionados');
          document.getElementById('23').classList.add('relacionados');
        }
      }
    }



    if (fila == 1 && columna == (this.dividendo + 3)) {
      if (document.getElementById('1' + (this.dividendo + 2)).getAttribute('data-valor') == '0') {
        let b = document.querySelectorAll('#11, #12, #22');

        while (b.length > 0) {
          b[0].classList.add('relacionados');
        }

      }
      document.getElementById('0' + (this.dividendo + 1)).classList.add('relacionados');
      //Si el valor divisible es el segundo
      if (document.getElementById('21').getAttribute('data-valor') && document.getElementById('21').getAttribute('data-valor') != '0') {
        document.getElementById('21').classList.add('relacionados');
        document.getElementById('21').classList.add('relacionados');
        document.getElementById('22').classList.add('relacionados');
        document.getElementById('32').classList.add('relacionados');
      } else if (document.getElementById('21').getAttribute('data-valor') == '0') {
        if (document.getElementById('23').getAttribute('data-valor')) {
          document.getElementById('22').classList.add('relacionados');
          document.getElementById('23').classList.add('relacionados');
          document.getElementById('33').classList.add('relacionados');
          document.getElementById('21').classList.add('relacionados');
        } else {
          document.getElementById('22').classList.add('relacionados');
          document.getElementById('32').classList.add('relacionados');
        }
      } else if (document.getElementById('23').getAttribute('data-valor')) {
        document.getElementById('21').classList.add('relacionados');
        document.getElementById('22').classList.add('relacionados');
        document.getElementById('23').classList.add('relacionados');
        document.getElementById('33').classList.add('relacionados');
      }
    }


    if (fila == 1 && columna == (this.dividendo + 4)) {
      if (document.getElementById('1' + (this.dividendo + 3)).getAttribute('data-valor') == '0') {
        let c = document.querySelectorAll('#22, #23, #33');
        while (c.length > 0) {
          c[0].classList.add('relacionados');
        }
      }
      document.getElementById('0' + (this.dividendo + 1)).classList.add('relacionados');
      //Si el valor divisible es el segundo
      if (document.getElementById('32').getAttribute('data-valor') && document.getElementById('32').getAttribute('data-valor') != '0') {
        document.getElementById('32').classList.add('relacionados');
        document.getElementById('33').classList.add('relacionados');
        document.getElementById('43').classList.add('relacionados');
      } else if (document.getElementById('32').getAttribute('data-valor') == '0') {
        if (document.getElementById('34').getAttribute('data-valor')) {
          document.getElementById('33').classList.add('relacionados');
          document.getElementById('34').classList.add('relacionados');
          //document.getElementById('44').classList.add('relacionados');
          document.getElementById('32').classList.add('relacionados');
        } else {
          document.getElementById('33').classList.add('relacionados');
          document.getElementById('43').classList.add('relacionados');
        }
      } else if (document.getElementById('34').getAttribute('data-valor')) {
        document.getElementById('32').classList.add('relacionados');
        document.getElementById('33').classList.add('relacionados');
        document.getElementById('34').classList.add('relacionados');
        //document.getElementById('44').classList.add('relacionados');
      }
    }
    //Marco el divisor
    document.getElementById('0' + (this.dividendo + 1)).classList.add('relacionados');
  }


}
