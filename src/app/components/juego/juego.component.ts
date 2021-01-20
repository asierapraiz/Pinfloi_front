import { Component, OnInit } from '@angular/core';
import { Partida } from './models/partida';
import { Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { routeAnimations, flyInOut } from './../../animations';
import { LocalStorageService } from "../../core/services/local-storage.service";



@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
  animations: [routeAnimations, flyInOut]
})
export class JuegoComponent implements OnInit {

  juego: string;
  assets = '../../assets/juegos/';

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private ls: LocalStorageService) { }

  ngOnInit(): void {
    this.juego = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {

      this.renderExternalScript(this.assets + 'scripts/librerias/storage.js').onload = () => {
        console.log("Storage cargado");
      }
      this.renderExternalScript(this.assets + this.juego + '/src/Boot.js').onload = () => {
        console.log("Boot de " + this.juego + " cargado");
        document.getElementById('loader').classList.add('hidde');
      }
    }, 2000);
  }


  renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  next() {
    console.log("Usuario:" + localStorage.getItem('usuario'));
    console.log("Puntos:" + localStorage.getItem('bunny-points'));

    this.router.navigate(['/tarea']);

  }

}
