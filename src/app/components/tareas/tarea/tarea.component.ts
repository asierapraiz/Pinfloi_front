import { ElementRef, Component, OnInit } from '@angular/core';
import { Avatar } from '../../../core/models/avatar.model';
import { Tarea } from '../../../core/models/tarea.model';
import { LocalStorageService } from "../../../core/services/local-storage.service";
import swal from 'sweetalert2';


let tarea = 'suma';
@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss', './../../../../styles/scss/auth.scss']
})
export class TareaComponent implements OnInit {

  usados: number[] = [];
  noUsar: number[] = [];
  inicio = new Date().getTime();
  intento!: number;
  maxErrores: number = 3;
  inputs: number = 0;
  aciertos: number = 0;
  errores: number = 0;
  seleccionado!: HTMLElement;
  elementos!: any;
  htmlToAdd: string = "";
  bien = new Audio("../sounds/bien.mp3");
  mal = new Audio("../sounds/mal.mp3");
  win = new Audio("../sounds/win.mp3");


  peloNegro = 'hue-rotate(0deg) brightness(60%) saturate(0) contrast(200%) sepia(0)';
  peloCastaño = 'hue-rotate(330deg) brightness(60%) saturate(0.8) contrast(140%) sepia(0.1)';
  peloCastañoClaro = 'hue-rotate(0deg) brightness(80%) saturate(1) contrast(80%) sepia(0)';
  peloPelirrojo = 'hue-rotate(330deg) brightness(80%) saturate(1) contrast(140%) sepia(0)';
  peloAzul = 'hue-rotate(180deg) brightness(100%) saturate(1) contrast(100%) sepia(0)';
  peloVerde = 'hue-rotate(-300deg) brightness(100%) saturate(1) contrast(100%) sepia(0)';
  peloRubio = 'hue-rotate(0deg) brightness(100%) saturate(1) contrast(100%) sepia(0)';


  avatar: Avatar = JSON.parse(localStorage.getItem("avatar") || "[]");
  tarea: Tarea = JSON.parse(localStorage.getItem("tareaActual") || "[]");
  user: string = JSON.parse(localStorage.getItem("nombre") || "[]");



  constructor(private elementRef: ElementRef) {
    this.tarea.intentos = 0;
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.addEventListeners();
  }

  addEventListeners() {
    console.log("En addEventListeners");
    //Añado los eventos en los elementos de la suma
    this.elementos = this.elementRef.nativeElement.querySelectorAll('.target');
    this.elementos.forEach((anchor: HTMLElement) => {
      anchor.addEventListener('click', this.seleccionaHueco.bind(this))
    })

    //Añado los eventos en los elementos de las opciones
    this.elementos = this.elementRef.nativeElement.querySelectorAll('.draggable');
    this.elementos.forEach((anchor: HTMLElement) => {
      anchor.addEventListener('click', this.seleccionaOpcion.bind(this))
    })
    this.inputs = document.getElementsByClassName("target").length;
  }

  protected creaOperacion() { };
  protected resuelveOperacion() { };
  protected muestraOperacion() { };


  dameNum(min: number, max: number) {
    this.usados = [];
    //console.log("min:"+min+"---Max:"+max);
    let numero: number = 0;
    let num = Math.floor(Math.random() * max) + min;
    if (this.usados.includes(num)) {//Si es un 0 y ya esta usado                
      this.dameNum(min, max);
    } else {//Si no se ha usado
      this.usados.push(num);
      numero = num;
    }
    return numero;
  }

  seleccionaHueco(event: any) {
    if (this.seleccionado != null) {
      this.seleccionado.classList.remove('seleccionado');
    }

    this.seleccionado = event.target;
    let itemList = document.getElementsByClassName('seleccionado');
    for (var i = 0; i < itemList.length; i++) {
      itemList[i].classList.remove('seleccionado');
      itemList[i].classList.remove('relacionados');
    }
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    target.classList.add('seleccionado');
  }

  seleccionaOpcion(event: any) {
    let target = event.target || event.srcElement || event.currentTarget;
    let valor = target.attributes['data-valor'].value;
    let v = this.seleccionado.attributes[2].value;

    if (valor == v) {
      this.seleccionado.classList.remove('seleccionado');
      this.seleccionado.innerHTML = valor;
      this.seleccionado.classList.add('acierto');
      this.seleccionado.removeEventListener('click', this.seleccionaOpcion.bind, false)
      this.acierto();
    } else {
      this.seleccionado.classList.remove('acierto');
      this.seleccionado.classList.add('error');
      this.seleccionado.innerHTML = valor;
      this.error();
    }
  }

  acierto() {
    this.aciertos++;
    if (this.aciertos == this.inputs) {
      localStorage.settItem("nombre")
    }
  }

  error() {
    this.errores++;
    debugger;


    if (this.errores == this.maxErrores) {

      this.elementos = this.elementRef.nativeElement.querySelectorAll('.target'); 
      this.elementos.forEach((anchor: HTMLElement) => {
        anchor.removeEventListener('click', this.seleccionaHueco, true)
      });
      
      let carton = document.querySelector('#carton');

      if (carton.hasChildNodes()) {
        carton.removeChild(carton.childNodes[0]);
      }

      this.creaOperacion();
      this.resuelveOperacion();
      this.muestraOperacion();
      this.showAlert();

    }
  }

  showAlert(): void {
    swal({
      title: 'Uppsss...',
      text: `Has cometidso ${this.maxErrores} errores,inténtalo de nuevo.`,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-large btn-success',
      buttonsStyling: false,
      reverseButtons: true
    }).then(() => {
      this.addEventListeners();
      this.tarea.intentos++;
      this.errores = 0;
    });
  }





}
