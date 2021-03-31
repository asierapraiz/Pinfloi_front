import { Injectable } from '@angular/core';
import { Avatar } from '../models/avatar.model';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //Getters
  sessionGetAvatar() { return JSON.parse(sessionStorage.getItem("avatar") || "[]"); }
  sessionGetUser() { return JSON.parse(sessionStorage.getItem("usuario") || "[]"); }
  getTareaActual() { return JSON.parse(localStorage.getItem("tareaActual") || "[]"); };
  sessionGetNombre() { return sessionStorage.getItem("nombre") || "desconocido" };

  //Setters
  sessionSetNombre(nombre) { sessionStorage.setItem('nombre', nombre); };
  setAvatar(avatar) { sessionStorage.setItem('avatar', JSON.stringify(avatar)); }
  setJuegos(juegosSeleccionados) { localStorage.setItem('juegos', JSON.stringify(juegosSeleccionados)); }
  setTareas(tareasSeleccionadas) { localStorage.setItem('tareas', JSON.stringify(tareasSeleccionadas)); }
  setTareaActual(tareasSeleccionadas) { localStorage.setItem('tareaActual', JSON.stringify(tareasSeleccionadas)); }

  getTablasHechas() { return JSON.parse(localStorage.getItem("tablasHechas") || "[]"); }
  setTablasHechas(tablas) { localStorage.setItem('tablasHechas', JSON.stringify(tablas)); }
  clearTablasHechas() { localStorage.setItem('tablasHechas', "") };

  setSeleccion(seleccion) { sessionStorage.setItem('seleccion', JSON.stringify(seleccion)); }
  getSeleccion() { return JSON.parse(sessionStorage.getItem("seleccion") || "{}") };

  getJuegosSeleccionados() { return JSON.parse(sessionStorage.getItem("seleccion")['juegosSeleccionados'] || "[]"); }
  getTareasSeleccionadas() { return JSON.parse(sessionStorage.getItem("seleccion")['tareasSeleccionadas'] || "[]"); }

  clear() { localStorage.clear(); }


}
