import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Constants } from '../../../global/constants';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Reto } from "./../../../core/models/reto.model";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RetoService {

  private urlEndPoint: string = Constants.API_ENDPOINT + 'reto/save';

  constructor(private http: HttpClient, private router: Router) { }

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

  create(tareas: any): Observable<any> {
    return this.http.post(this.urlEndPoint, tareas)
      .pipe(
        map((response: any) => response as Reto),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));
  }



}
