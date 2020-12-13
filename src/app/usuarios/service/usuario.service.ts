import { Injectable } from '@angular/core';
import { Constants } from '../global/constants';
import { Usuario } from '../usuarios/models/usuario';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = Constants.API_ENDPOINT+'api/usuario';
  constructor( private http: HttpClient, private router: Router) { }

  create(usuario: Usuario): Observable<Usuario> {    
    return this.http.post(this.urlEndPoint, usuario)
      .pipe(
        map((response: any) => response.usuario as Usuario),
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

  recuperaPass(userEmail){       

    return this.http.get(this.urlEndPoint+"/resetPassword/"+ userEmail)
    .pipe(
      map((response: any) => response.usuario as Usuario),
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

  changePass(newPass, token){  
      
    let params = new HttpParams()
    .set('newPassword', newPass) 
    .set('token', token);      

    return this.http.get(this.urlEndPoint+"/changePassword/", {params: params})
    .pipe(
      map((response: any) => response.usuario as Usuario),
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
