import { ElementRef, Component, OnInit } from '@angular/core';
import { TareaService } from './../services/tarea.service';
import { routeAnimations } from './../../../animations/index';
import TareaUtils from './../tarea-utils';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dividir-de-dos',
  templateUrl: './dividir-de-dos.component.html',
  styleUrls: ['./dividir-de-dos.component.scss']
})
export class DividirDeDosComponent extends TareaUtils implements OnInit {

  divisor = 2;
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

    /*
        let huecos = this.elementRef.nativeElement.querySelectorAll('.target');
    
        huecos.forEach((hueco: HTMLElement) => {
          hueco.addEventListener('click', this.marcaRelacionados.bind(this))
        })*/

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
            var num = this.dameNum(2, 9) + "";
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
    var localDividendo = "";
    for (var a = 0; a < this.dividendo; a++) {
      localDividendo += this.filas[0][a];
    }
    var localDivisor = "";
    for (var a = this.dividendo + 1; a < (this.dividendo + 1) + this.divisor; a++) {
      localDivisor += this.filas[0][a];
    }
    var res = Math.floor(parseInt(localDividendo) / parseInt(localDivisor));
    var resultado = res.toString();

    //Guardo los valores de la solución "resultado" en la fila y casilas correspondientes.
    for (var a = this.dividendo + 1, i = 0; a < (this.dividendo + 1) + resultado.length; a++, i++) {
      this.filas[1][a] = resultado[i];
    }
    //Elimino las columnas vacias    
    if (this.dividendo + this.divisor > this.dividendo + resultado.length) {
      var x = this.dividendo + this.divisor + 1;
    } else {
      var x = this.dividendo + resultado.length + 1;
    }
    //i es la cantidad de registros q tengo q borrar.       
    var i = this.filas[0].length - x;
    for (var a = 0; a < this.filas.length; a++) {
      this.filas[a].splice(x, i);
    }
    var flag = true;
    for (var f = 1, c = 0; c < resultado.length; f++, +c++) {
      var up = "";
      if (flag == false) {
        break;
      }
      //Recorro la fila hasta que el valor sea mayor que el resultado temporal.
      for (var a = 0; a < localDividendo.length; a++) {
        //Si no hay numero, lo bajo
        if (this.filas[f - 1][a] == ".") {
          this.filas[f - 1][a] = this.filas[0][a];
          if (a == localDividendo.length - 1) {
            flag = false;
          }
        }
        //Tomo el valor
        if (this.filas[f - 1][a] != "x") {
          up += this.filas[f - 1][a];
        }
        //Si es divisible
        if (parseInt(up) >= parseInt(localDivisor)) {
          console.log(up + "/" + localDivisor + "=" + parseInt(up) % parseInt(localDivisor));
          //Coloco los ceros anteriores.
          for (var n = a; n >= 0; n--) {
            this.filas[f][n - 2] = 'x';
          }
          //Coloco el resto
          let resto = (parseInt(up) % parseInt(localDivisor)).toString();
          //&& up.length==3
          if (resto.length == 1) {
            resto = '0' + resto;
          }
          this.filas[f][a - 1] = resto[0];
          this.filas[f][a] = resto[1];
          //Si siguen habiendo numeros, los bajo.
          if (this.filas[0][a + 1] != ".") {
            this.filas[f][a + 1] = this.filas[0][a + 1];
          }
          break;
        }
      }
    }
    this.muestraPorConsola();
  }

  muestraOperacion() {
    //document.querySelector("#carton").classList.add('division');
    for (var f = 0; f < this.filas.length; f++) {
      //Creo las filas.
      var fila = "<div id='f" + f + "' class='fila'>";
      for (var c = 0; c < this.filas[0].length; c++) {
        //Creo el contenido de de cada fila
        if (f == 0) {
          if (this.filas[f][c] == ".") {
            fila += "<p class='item '></p>";
          } else {
            if (c <= this.dividendo) {
              fila += "<p id='" + f + "" + c + "' class='item draggable'  data-resultado='" + this.filas[f][c] + "' >" + this.filas[f][c] + "</p>";
            } else {
              fila += "<p id='" + f + "" + c + "' class='item' >" + this.filas[f][c] + "</p>";
            }
          }
        } else if (f < this.filas.length) {
          if (this.filas[f][c] == "x" || this.filas[f][c] == ".") {
            fila += "<p class='item'></p>";
          } else {
            fila += "<p id='" + f + "" + c + "' class='item resultado hueco target' data-valor='" + this.filas[f][c] + "' ></p>";
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


  /*
    marcaRelacionados(elemento) {
  
  
      this.limpiaRelacionados();
      var fila = (elemento.target.id)[0];
      var columna = (elemento.target.id)[1];
  
      var divisor = document.getElementById("0" + (this.dividendo + 1)).textContent;
      divisor = divisor + document.getElementById("0" + (this.dividendo + 2)).textContent;
  
      var dividendo = '';
      for (var a = 0; a < this.dividendo; a++) {
        dividendo += this.filas[0][a];
      }
  
  
  
      var llevada = 0;
      var decena = 0;
  
      //Marco el elemento seleccionado
      let yo = document.getElementById(elemento.target.id);
      yo !== null ? yo.classList.add("seleccionado") : '';
  
      var elements;
      //Marco el divisor
  
      // let di = document.querySelectorAll("#0" + (this.dividendo + 1) + ", #0" + (this.dividendo + 2) + "");
      // while (di.length > 0) {
      //   di[0].classList.add('relacionados');
      // }
      //Si es el primer digito del resultado...
      if (fila == 1 && columna == (this.dividendo + 1)) {
        //Si los  dos primeros digitos del dividendo es mayor que el divisor
        if ((parseInt(document.querySelector("#00").textContent) + parseInt(document.querySelector("#01").textContent)) >= parseInt(divisor)) {
          elements = document.querySelectorAll("#00, #01, #10, #11");
  
  
  
        } else { //Si el primer digito del dividendo es menor que el divisor
  
          elements = document.querySelectorAll("#00, #01, #02, #10, #11, #12");
  
  
  
        }
        if (fila == 1 && columna == (this.dividendo + 2)) {
          var divisor = "";
          for (var a = 0; a <= parseInt(dividendo) - 1; a++) {
            divisor += this.filas[0][a];
          };
          if (document.querySelector("#" + elemento.id).getAttribute('data-valor') == '0') {
            var b = "";
            for (var a = 0; a <= parseInt(dividendo) - 1; a++) {
              if (this.filas[1][a] != ".") {
                b = a;
              }
            };
            document.querySelector("#1" + b).classList.add('relacionados');
          } else {
            document.querySelector("#0" + (this.dividendo + 1)).classList.add('relacionados');
            //Si el valor divisible es el segundo
            if (document.querySelector("#10").getAttribute('data-valor') && document.querySelector("#10").getAttribute('data-valor') != '0') {
              console.log("Estoy en la 454");
              elements = document.querySelectorAll("#10, #11, #12, #21, #22");
  
  
            } else if (document.querySelector("#10").getAttribute('data-valor') == '0') {
              if (document.querySelector("#12").getAttribute('data-valor')) {
                console.log("Estoy en la 465");
                document.querySelectorAll("#10, #11, #12, #21, #22");
  
              } else {
                console.log("Estoy en la 473");
                elements = document.querySelectorAll("#11, #21, #22");
  
              }
            } else if (document.querySelector("#12").getAttribute('data-valor')) {
              console.log("Estoy en la 480");
              elements = document.querySelectorAll("#11, #12, #13, #21, #22, #23");
  
            }
          }
  
        }
  
  
  
        if (fila == 1 && columna == (this.dividendo + 3)) {
          console.log(this);
          console.log(divisor);
          if (document.querySelector("#1" + (this.dividendo + 2)).getAttribute('data-valor') == '0') {
            var b = "";
            for (var a = 0; a <= parseInt(dividendo) - 1; a++) {
              if (this.filas[2][a] != ".") {
                b = a;
              }
            };
            document.querySelector("#2" + b).classList.add('relacionados');
          }
          document.querySelector("#0" + (this.dividendo + 1)).classList.add('relacionados');
          //Si el valor divisible es el segundo
          if (document.querySelector("#21").getAttribute('data-valor') && document.querySelector("#21").getAttribute('data-valor') != '0') {
            console.log("Estoy en la 534");
            document.querySelector("#21").classList.add('relacionados');
            document.querySelector("#21").classList.add('relacionados');
            document.querySelector("#22").classList.add('relacionados');
            document.querySelector("#32").classList.add('relacionados');
          } else if (document.querySelector("#21").getAttribute('data-valor') == '0') {
            if (document.querySelector("#23").getAttribute('data-valor')) {
              console.log("Estoy en la 545");
              document.querySelector("#22").classList.add('relacionados');
              document.querySelector("#23").classList.add('relacionados');
              document.querySelector("#33").classList.add('relacionados');
              document.querySelector("#21").classList.add('relacionados');
            } else {
              console.log("Estoy en la 553");
              document.querySelector("#22").classList.add('relacionados');
              document.querySelector("#32").classList.add('relacionados');
            }
          } else if (document.querySelector("#23").getAttribute('data-valor')) {
            console.log("Estoy en la 560");
            document.querySelector("#21").classList.add('relacionados');
            document.querySelector("#22").classList.add('relacionados');
            document.querySelector("#23").classList.add('relacionados');
            document.querySelector("#24").classList.add('relacionados');
            document.querySelector("#33").classList.add('relacionados');
            document.querySelector("#34").classList.add('relacionados');
          }
        }
        if (fila == 1 && columna == (this.dividendo + 4)) {
          if (document.querySelector("#1" + (this.dividendo + 3)).getAttribute('data-valor') == '0') {
            elements = document.querySelectorAll("#22, #23, #33");
          }
          document.querySelector("#0" + (this.dividendo + 1)).classList.add('relacionados');
          //Si el valor divisible es el segundo
          if (document.querySelector("#32").getAttribute('data-valor') && document.querySelector("#32").getAttribute('data-valor') != '0') {
            document.querySelector("#32").classList.add('relacionados');
            document.querySelector("#33").classList.add('relacionados');
            document.querySelector("#43").classList.add('relacionados');
          } else if (document.querySelector("#32").getAttribute('data-valor') == '0') {
            if (document.querySelector("#34").getAttribute('data-valor')) {
              document.querySelector("#33").classList.add('relacionados');
              document.querySelector("#34").classList.add('relacionados');
              //document.querySelector("#44").classList.add('relacionados');
              document.querySelector("#32").classList.add('relacionados');
            } else {
              document.querySelector("#33").classList.add('relacionados');
              document.querySelector("#43").classList.add('relacionados');
            }
          } else if (document.querySelector("#34").getAttribute('data-valor')) {
            document.querySelector("#32").classList.add('relacionados');
            document.querySelector("#33").classList.add('relacionados');
            document.querySelector("#34").classList.add('relacionados');
            //document.querySelector("#44").classList.add('relacionados');
          }
        }
  
        elements.forEach((el: HTMLElement) => {
          el.classList.add('relacionados');
        })
      }
    }*/

}
