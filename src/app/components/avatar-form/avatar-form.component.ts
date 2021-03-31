import { Component, OnInit } from '@angular/core';
import { Avatar } from './../../core/models/avatar.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from "../../core/services/local-storage.service";
import { fadeInAnimation } from './../../animations';
import { RetoService } from './../reto/services/reto.service';
import { AvatarService } from './../../core/services/avatar.service';
import { AuthService } from '../usuarios/service/auth.service';







@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss'],
  animations: [fadeInAnimation]
})
export class AvatarFormComponent implements OnInit {

  public avatar: Avatar = new Avatar();

  pelos = Array(30).fill(null).map((x, i) => i + 1);
  ojos = Array(24).fill(null).map((x, i) => i + 1);
  narices = Array(6).fill(null).map((x, i) => i + 1);
  bocas = Array(24).fill(null).map((x, i) => i + 1);
  cejas = Array(12).fill(null).map((x, i) => i + 1);
  torsos = Array(16).fill(null).map((x, i) => i + 1);

  private peloNegro = 'hue-rotate(0deg) brightness(60%) saturate(0) contrast(200%) sepia(0)';
  private peloCastaño = 'hue-rotate(330deg) brightness(60%) saturate(0.8) contrast(140%) sepia(0.1)';
  private peloCastañoClaro = 'hue-rotate(0deg) brightness(80%) saturate(1) contrast(80%) sepia(0)';
  private peloPelirrojo = 'hue-rotate(330deg) brightness(80%) saturate(1) contrast(140%) sepia(0)';
  private peloAzul = 'hue-rotate(180deg) brightness(100%) saturate(1) contrast(100%) sepia(0)';
  private peloVerde = 'hue-rotate(-300deg) brightness(100%) saturate(1) contrast(100%) sepia(0)';
  private peloRubio = 'hue-rotate(0deg) brightness(100%) saturate(1) contrast(100%) sepia(0)';


  //Variables-filto de torso
  private torsoMorado = 'hue-rotate(-240deg) brightness(80%) saturate(1) contrast(100%) sepia(0)';
  private torsoVerde = 'hue-rotate(300deg) brightness(100%) saturate(1) contrast(100%) sepia(0)';
  private torsoNaranja = 'hue-rotate(-300deg) brightness(100%) saturate(1) contrast(100%) sepia(0)';
  private torsoAzul = 'hue-rotate(0deg) brightness(100%) saturate(1) contrast(100%) sepia(0)';


  constructor(private avatarService: AvatarService,
    private retoService: RetoService,
    private localStorage: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('registro');

    });

    if (!this.authService.isAuthenticated() && this.localStorage.getSeleccion().avatar) {
      this.avatar = this.authService.usuario.avatar;
      this.seleccion();
    }
  }

  seleccion() {

    let elements = document.getElementsByClassName('d-none');
    while (elements.length > 0) {
      elements[0].classList.remove("d-none");
    }
    document.querySelector('#indefinido')?.classList.add("d-none");
    document.querySelector('#indefinido-aside')?.classList.add("d-none");

    this.retoService.seleccionaAvatar(this.avatar);
  };

  continuar() {
    if (this.authService.isAuthenticated()) {
      this.avatarService.saveUserAvatar(this.avatar).subscribe(user => {
        this.authService.guardarAvatar(this.avatar);
        this.router.navigate(['reto/tareas']);
      });
    } else {
      this.localStorage.setAvatar(this.avatar);
      let tareaActual = JSON.parse(localStorage.getItem("tareaActual") || "[]");
      this.router.navigateByUrl('/reto/tareas');
    }
  }
}
