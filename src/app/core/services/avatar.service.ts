import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { AuthService } from '../../components/usuarios/service/auth.service';
import { Avatar } from '../models/avatar.model';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { map, catchError, tap } from 'rxjs/operators';
import { Constants } from '../../global/constants';
import { Usuario } from './../../components/usuarios/models/usuario';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private urlEndPoint: string = Constants.API_ENDPOINT + 'api/avatar';

  constructor(private authService: AuthService, private http: HttpClient) { }

  saveUserAvatar(avatar: Avatar) {
    return this.http.post(`${this.urlEndPoint}/save/${this.authService.usuario.id}`, avatar)
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
