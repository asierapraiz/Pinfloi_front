import { Avatar } from "./avatar.model";
import { Juego } from "./juego.model";
import { Tarea } from "./tarea.model";

export class Reto {
    nombre: string;
    avatar: Avatar;
    tareasSeleccionadas: Tarea[];
    juegosSeleccionados: Juego[];
    tareaActual: number;
    juegoActual: number;


}