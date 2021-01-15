import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SeleccionService {


  private seleccionaTareaSource = new Subject<any>();
  seleccionaTarea$ = this.seleccionaTareaSource.asObservable();

  private seleccionaJuegoSource = new Subject<any>();
  seleccionaJuego$ = this.seleccionaJuegoSource.asObservable();

  private seleccionaNombreSource = new Subject<any>();
  seleccionaNombre$ = this.seleccionaNombreSource.asObservable();

  private seleccionaAvatarSource = new Subject<any>();
  seleccionaAvatar$ = this.seleccionaAvatarSource.asObservable();


  seleccionaTarea(tarea: any) {
    this.seleccionaTareaSource.next(tarea);
  }

  seleccionaJuego(juego: any) {
    this.seleccionaJuegoSource.next(juego);
  }

  seleccionaNombre(nombre: any) {
    this.seleccionaNombreSource.next(nombre);
  }

  seleccionaAvatar(avatar: any) {
    this.seleccionaAvatarSource.next(avatar);
  }



}
