import { Component, OnInit } from '@angular/core';
import { Avatar } from './avatar.model';
import { Router } from '@angular/router';
import { LocalStorageService } from "../../core/services/local-storage.service";
import { fadeInAnimation } from './../../animations';
import { SeleccionService } from './../seleccion/services/seleccion.service';





@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss', './../../../styles/scss/auth.scss'],
  animations: [fadeInAnimation]
})
export class AvatarFormComponent implements OnInit {

  public avatar: Avatar = {
    definido: false,
    pelo: 'pelo_1',
    cejas: 'cejas_1',
    ojos: 'ojo_1',
    nariz: 'nariz_1',
    boca: 'boca_1',
    cara: 'cara_1',
    torso: 'torso_1'
  };

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


  constructor(private ss: SeleccionService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {

    if (this.localStorage.getSeleccion().avatar && this.localStorage.getSeleccion().avatar.definido == true) {
      this.avatar = this.localStorage.getSeleccion().avatar;
      this.seleccion();
    }

  }

  seleccion() {
    let elements = document.getElementsByClassName('d-none');
    while (elements.length > 0) {
      elements[0].classList.remove("d-none");
    }
    document.querySelector('#indefinido').classList.add("d-none");
    document.querySelector('#indefinido-aside').classList.add("d-none");

    this.avatar.definido = true;
    this.ss.seleccionaAvatar(this.avatar);
  };

  continuar() {
    this.localStorage.setAvatar(this.avatar);
    let tareaActual = JSON.parse(localStorage.getItem("tareaActual") || "[]");
    this.router.navigateByUrl('/tarea/' + tareaActual.name);
  }

}
