import { ElementRef } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { TareaService } from './../tarea/services/tarea.service';




export default class TareaUtils {

    intentos: number;
    seleccionado!: HTMLElement;
    usados: number[] = [];
    noUsar: number[] = [];
    inicio = new Date().getTime();
    intento!: number;
    maxErrores: number = 3;
    inputs: number = 0;
    aciertos: number = 0;
    errores: number = 0;
    columnas!: number;
    filas!: any[];
    carton!: Element | null;
    ciclo: number = 0;


    elementos!: any;
    htmlToAdd: string = "";

    constructor(
        protected ts: TareaService,
        protected elementRef: ElementRef
    ) { }

    addEventListeners() {
        console.log("En addEventListeners");

        //Añado los eventos en los elementos de la tarea, targets y inputs
        let huecos = this.elementRef.nativeElement.querySelectorAll('.target');

        huecos.forEach((hueco: HTMLElement) => {
            hueco.addEventListener('click', this.seleccionaHueco.bind(this))
        })

        let inputs = this.elementRef.nativeElement.querySelectorAll('.item');
        inputs.forEach((hueco: HTMLElement) => {
            hueco.addEventListener('click', this.seleccionaHueco.bind(this));
        })
    }



    seleccionaHueco(element: any) {

        if (this.seleccionado != null) {
            this.seleccionado.classList.remove('seleccionado');
        }
        this.ts.seleccionaHueco(element.target);
        this.seleccionado = element.target;
        this.seleccionado.classList.add('seleccionado');
    }



    dameNum(min: number = 0, max: number) {
        this.ciclo++;
        console.log(this.ciclo);
        this.ciclo > 100 ? this.noUsar = [] : '';
        //console.log("min:"+min+"---Max:"+max);        
        let numero: number = 0;
        let num = Math.floor(Math.random() * (max - min + 1) + min);
        if (this.noUsar.includes(num)) {
            this.dameNum(min, max);
        } else if (this.usados.includes(num)) {//Si es un 0 y ya está usado   
            this.noUsar.push(num)
            numero = num;
        } else {//Si no se ha usado
            this.usados.push(num);
            numero = num;
        }
        return numero;
    }

    limpiaRelacionados() {
        //Limpio
        let relacionados = document.getElementsByClassName('relacionados');
        while (relacionados.length > 0) {
            relacionados[0].classList.remove("relacionados");
        }
    }




}