import { Injectable } from '@angular/core';
import { Constants } from '../../../global/constants';
import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Reto } from './../../../core/models/reto.model';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';
import { Avatar } from './../../../core/models/avatar.model';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;

  private urlEndPoint: string = Constants.API_ENDPOINT + 'api/usuario';
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

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

  recuperaPass(userEmail) {

    return this.http.get(this.urlEndPoint + "/resetPassword/" + userEmail)
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

  changePass(newPass, token) {

    let params = new HttpParams()
      .set('newPassword', newPass)
      .set('token', token);

    return this.http.get(this.urlEndPoint + "/changePassword/", { params: params })
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


  gardarReto(reto: Reto): Observable<any> {

    this.usuario = new Usuario();
    this.usuario.username = "asier";
    this.usuario.password = "12345";
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      // this.router.navigate(['/clientes']);
      //swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status == 400) {
        swal('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
    return this.http.post(`${this.urlEndPoint}/${this.usuario.id}/reto`, reto);
  }


  getAvatar(id: any): Observable<Usuario> {//api/avatar/get/4


    return this.http.post("http://localhost:8080/api/avatar/get/" + id, null)
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
