import { Injectable } from '@angular/core';
import { Avatar } from '../models/avatar.model';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //Getters
  getAvatar() { return JSON.parse(localStorage.getItem("avatar") || "[]"); }
  getUser() { return localStorage.getItem("nombre"); }
  getTareaActual() { JSON.parse(localStorage.getItem("tareaActual") || "[]"); };

  //Setters
  setNombre(nombre) { localStorage.setItem('nombre', JSON.stringify(nombre)); };
  setAvatar(avatar) { localStorage.setItem('avatar', JSON.stringify(avatar)); }
  setJuegos(juegosSeleccionados) { localStorage.setItem('juegos', JSON.stringify(juegosSeleccionados)); }
  setTareas(tareasSeleccionadas) { localStorage.setItem('tareas', JSON.stringify(tareasSeleccionadas)); }
  setTareaActual(tareasSeleccionadas) { localStorage.setItem('tareaActual', JSON.stringify(tareasSeleccionadas)); }


  setSeleccion(seleccion) { localStorage.setItem('seleccion', JSON.stringify(seleccion)); }
  getSeleccion() { return JSON.parse(localStorage.getItem("seleccion") || "{}") };


}
