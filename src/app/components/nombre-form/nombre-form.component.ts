import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from "../../core/services/local-storage.service";
import { RetoService } from './../reto/services/reto.service';
import { Usuario } from '../usuarios/models/usuario';
import { AuthService } from '../usuarios/service/auth.service';
import swal from 'sweetalert2';



@Component({
  selector: 'app-nombre-form',
  templateUrl: './nombre-form.component.html',
  styleUrls: ['./nombre-form.component.scss']
})
export class NombreFormComponent implements OnInit {

  nombre: string;
  animacion: boolean;
  paused: boolean;
  usuario: Usuario = new Usuario();

  constructor(private authService: AuthService, private retoService: RetoService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.localStorage.getSeleccion().nombre) {
      this.nombre = this.localStorage.getSeleccion().nombre;
    }
  }

  keyDown() {
    //this.retoService.seleccionaNombre(this.nombre);
    //console.log("Tamaño nombre :" + this.nombre.length);
    this.animacion = false;
    this.paused = true;

    if (this.usuario.username.length < 20) {
      document.getElementById('cara').style.left = (0 + this.usuario.username.length) + "px";
      document.getElementById('cara').style.top = 25 + "px";
      document.getElementById('ojoIzq').style.left = 5 + (2 * this.usuario.username.length) + "px";
      document.getElementById('irisIzq').style.left = 5 + (0.2 * this.usuario.username.length) + "px";
      document.getElementById('brilloIzq').style.left = 5 + (0.2 * this.usuario.username.length) + "px";
      document.getElementById('ojoDch').style.left = 45 + (2 * this.usuario.username.length) + "px";
      document.getElementById('irisIzq').style.left = 5 + (0.2 * this.usuario.username.length) + "px";
      document.getElementById('brilloIzq').style.left = 5 + (0.2 * this.usuario.username.length) + "px";
    }

  }




  keyUp() {

    document.getElementById('cara').style.left = 0 + "px";
    document.getElementById('cara').style.top = 0 + "px";
    document.getElementById('ojoIzq').style.left = 25 + "px";
    document.getElementById('ojoIzq').style.top = 30 + "px";
    document.getElementById('irisIzq').style.left = 5 + "px";
    document.getElementById('irisIzq').style.top = 40 + "%";
    document.getElementById('brilloIzq').style.left = 5 + "px";
    document.getElementById('brilloIzq').style.top = 42 + "%";

    document.getElementById('ojoDch').style.left = 65 + "px";
    document.getElementById('ojoDch').style.top = 30 + "px";
    document.getElementById('irisDch').style.left = 5 + "px";
    document.getElementById('irisDch').style.top = 40 + "%";
    document.getElementById('brilloDch').style.left = 5 + "px";
    document.getElementById('brilloDch').style.top = 42 + "%";

    this.animacion = true;
    this.paused = false;
  }



  start() {

    this.localStorage.sessionSetNombre(this.nombre);
    this.router.navigateByUrl('/nodo-bg/avatar');
    //this.retoService.seleccionaNombre(this.nombre);

    //let tareaActual = JSON.parse(localStorage.getItem("tareaActual") || "[]");
    //this.router.navigateByUrl('/tarea/' + tareaActual.name);
  }



}
