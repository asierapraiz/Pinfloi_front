export class Valoracion {
    id: number;
    aciertos?: number;
    errores?: number;
    intentos?: number;
    nota?: number;

    constructor() {
        this.aciertos = 0;
        this.errores = 0;
        this.intentos = 0;
        this.nota = null;
    }
}

