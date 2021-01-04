import { ElementRef } from '@angular/core';
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

    elementos!: any;
    htmlToAdd: string = "";

    constructor(
        protected ts: TareaService,
        protected elementRef: ElementRef
    ) { }



    seleccionaHueco(element: any) {

        if (this.seleccionado != null) {
            this.seleccionado.classList.remove('seleccionado');
        }        
        this.ts.seleccionaHueco(element.target);

        this.seleccionado = element.target;
        this.seleccionado.classList.add('seleccionado');
        console.log("El hueco seleccionado tien data-valor=" + this.seleccionado.attributes['data-valor'].value);
    
    }

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



}