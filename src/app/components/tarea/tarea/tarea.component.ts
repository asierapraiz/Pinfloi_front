import { ElementRef, HostBinding, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { routeAnimations, flyInOut } from '../../../animations';
import { TareaService } from '../services/tarea.service';
import { RetoService } from '../../reto/services/reto.service';;
import { Avatar } from '../../../core/models/avatar.model';
import { Tarea } from '../../../core/models/tarea.model';
import { LocalStorageService } from "../../../core/services/local-storage.service";
import { Reto } from "../../../core/models/reto.model";
import swal from 'sweetalert2';
import { Valoracion } from '../../../core/models/valoracion.model';
import { Constants } from '../../../global/constants';
import { UsuarioService } from '../../usuarios/service/usuario.service';
import { AuthService } from '../../usuarios/service/auth.service';
import { TareaModalService } from '../../../core/services/tarea-modal.service';
import { flyInFromLeft } from './../../../animations';
import { ResourceLoader } from '@angular/compiler';








@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  animations: [routeAnimations, flyInOut, flyInFromLeft],
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {




  subscription!: Subscription;
  errores: number = 0;
  intentos: number = 1;
  showComponent: boolean = true;
  inputs!: number;
  huecoSeleccionado: Element;
  aciertos: number = 0;
  showDragables: boolean = true;
  tablasHechas: number[] = [];
  valoracion: Valoracion;
  open: boolean = false;
  avatar: Avatar;
  tareasSeleccionadas: Tarea[];
  tarea: string = '';
  nombre: string;
  isOpen: boolean = true;

  reto: Reto = {
    nombre: '',
    avatar: {},
    tareasSeleccionadas: [],
    juegosSeleccionados: [],
    tareaActual: 0,
    juegoActual: 0
  }


  constructor(private ts: TareaService,
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private ls: LocalStorageService,
    private usuarioService: UsuarioService,
    private retoService: RetoService,
    public authService: AuthService,
    public tareaModalService: TareaModalService) {

    this.reto = this.ls.getSeleccion();
    this.tareasSeleccionadas = this.reto.tareasSeleccionadas;
    this.mostrarUsuario();

    //Si es la primera vuelta y no hay tareaActual
    if (!this.reto.tareaActual) {
      this.reto.tareaActual = 0;
      this.ls.setSeleccion(this.reto);
    }
    this.tarea = this.reto.tareasSeleccionadas[this.reto.tareaActual].name;

    if (this.tarea.includes('ladel')) {
      this.tarea = this.tarea.replace(" ", "/");
      this.showDragables = false;
    } else {
      this.showDragables = true;
    }
    console.log("Tarea=>" + this.tarea);

    //Si ya ha realizado toda las teras del reto ...
    if (this.reto.tareaActual == 0 && this.reto.tareasSeleccionadas[this.reto.tareasSeleccionadas.length - 1].valoracion != null) {
      this.retoTerminado();
    } else {
      this.router.navigate(['./' + `${this.tarea}`], { relativeTo: this.route });
    }
  }

  ngOnInit(): void {
    this.ls.getTablasHechas() ? this.tablasHechas = this.ls.getTablasHechas() : '';
  }

  ngAfterViewInit() {
    this.eventsSubscriptions();
    this.fixFontSize();
  }

  noRegistrado() {
    swal({
      title: '¿Quieres guardar las tareas de este reto?',
      //text: `¿Quieres guardar las tareas de este reto?`,
      showCancelButton: true,
      confirmButtonText: 'Registrarme',
      cancelButtonText: 'No, gracias',
      confirmButtonClass: 'btn  btn-primary boton',
      cancelButtonClass: 'btn btn-primary boton',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {

      if (result.dismiss) {
        swal.close();
      } else if (result.value) {
        sessionStorage.removeItem('seleccion');
        this.router.navigate(['/registro-bg/registro']);

      }
    });

  }

  eventsSubscriptions() {
    //Recargar

    //Añado los eventos en los elementos de las opciones
    this.rechargeDraggableEvents();

    this.ts.rechargeDraggableEvents$.subscribe(
      () => {
        this.rechargeDraggableEvents();
      }
    );

    this.ts.addError$.subscribe(
      () => {
        this.errores++;
      }
    );

    this.ts.addAcierto$.subscribe(
      () => {
        this.aciertos++;
      }
    );

    this.ts.seleccionaHueco$.subscribe(
      (hueco) => {
        this.huecoSeleccionado = hueco;
      }
    );

    document.getElementById('pizarra').addEventListener('click', this.limpiaTodo);


    this.ts.seleccionaOpcion$.subscribe(
      (opcion) => {
        this.seleccionaOpcion(opcion);
      }
    );

    this.ts.tablaHecha$.subscribe(
      (ladel) => {
        this.tablasHechas.push(ladel);
        this.ls.setTablasHechas(this.tablasHechas);
        this.goToGame();
      }
    );

  }

  rechargeDraggableEvents() {
    let opciones = this.elementRef.nativeElement.querySelectorAll('.draggable');
    opciones.forEach((anchor: HTMLElement) => {
      anchor.addEventListener('click', this.seleccionaOpcion.bind(this))
    });
  }

  mostrarUsuario() {

    if (this.authService.isAuthenticated()) {
      console.log("Esta autenticado");
      this.avatar = this.authService.usuario.avatar;
      this.nombre = this.authService.usuario.nombre;

    } else {
      this.avatar = this.ls.sessionGetAvatar();
      this.nombre = this.ls.sessionGetNombre();
    }

  }

  actualizaJuego() {
    let next: number;
    this.reto.juegoActual + 1 == this.reto.juegosSeleccionados.length ? next = 0 : next = this.reto.juegoActual + 1;

    return next;
  }

  actualizaTarea() {
    let next: number;
    this.reto.tareaActual + 1 == this.reto.tareasSeleccionadas.length ? next = 0 : next = this.reto.tareaActual + 1;

    return next;
  }

  seleccionaOpcion(opcion: any) {

    if (this.huecoSeleccionado.id == 'llevadas') {
      document.getElementById('llevada').innerHTML = opcion.target.attributes['data-valor'].value;
      return;
    }

    if (!this.huecoSeleccionado || this.huecoSeleccionado.classList.contains('acierto')) {
      return;
    }

    if (this.huecoSeleccionado.classList.contains('llevada')) {

      this.huecoSeleccionado.innerHTML = opcion.target.attributes['data-valor'].value;

    } else if (this.huecoSeleccionado.classList.contains('target')) {

      this.huecoSeleccionado.innerHTML = opcion.target.attributes['data-valor'].value;

    } else if (this.huecoSeleccionado.classList.contains('input')) {

      let resultado = parseInt(opcion.target.attributes['data-valor'].value) + parseInt(this.huecoSeleccionado.textContent);
      this.huecoSeleccionado.innerHTML = '' + resultado;

    }

    //Acierto
    if (this.huecoSeleccionado.textContent == this.huecoSeleccionado.attributes['data-valor'].value) {

      if (parseInt(this.huecoSeleccionado.textContent) > 9) {
        this.huecoSeleccionado.classList.add('font-size-min');
      }
      this.inputs = document.getElementsByClassName("target").length;
      this.huecoSeleccionado.classList.add('acierto');
      this.huecoSeleccionado.classList.remove('seleccionado');
      this.aciertos++;


      if (this.aciertos == this.inputs && !this.tarea.includes('ladel')) {
        this.goToGame();
      }
    } else {//Error
      this.huecoSeleccionado.classList.remove('acierto');
      this.huecoSeleccionado.classList.add('error');
      this.errores++;

      if (this.errores == 3) {

        this.reto.tareasSeleccionadas[this.reto.tareaActual].valoracion = this.valora(false);
        this.ls.setSeleccion(this.reto);
        let g = this.reto.tareasSeleccionadas[this.reto.tareaActual];

        setTimeout(() => {
          this.errores = 0;
          this.intentos++;
          this.router.navigate(['./mensaje'], { relativeTo: this.route });
        }, 1000);

      }
    }

    this.limpiaRelacionados();

  }

  valora(ok: boolean): Valoracion {
    let nota = null;
    if (ok) {
      nota = 3;
    }
    let valoracion: Valoracion = { 'id': null, 'aciertos': this.aciertos, 'errores': this.errores, 'intentos': this.intentos, 'nota': nota };

    return valoracion;
  }

  goToGame() {
    setTimeout(() => {
      swal({
        title: 'Muy bienn!',
        text: `Te mereces una partida.`,
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Vamos!',
        confirmButtonClass: 'btn  btn-primary boton',
        buttonsStyling: false
      }).then((result) => {
        setTimeout(() => {
          this.reto.tareasSeleccionadas[this.reto.tareaActual].valoracion = this.valora(true);

          this.reto.tareaActual = this.actualizaTarea();
          this.reto.juegoActual = this.actualizaJuego();

          this.ls.setSeleccion(this.reto);

          this.router.navigateByUrl('/juego/' + this.reto.juegosSeleccionados[this.reto.juegoActual].name);

        }, 500);
      });
    }, 1500);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  limpiaRelacionados() {
    //Limpio
    let relacionados = document.getElementsByClassName('relacionados');
    while (relacionados.length > 0) {
      relacionados[0].classList.remove("relacionados");
    }
  }

  limpiaTodo() {
    //Limpio
    let relacionados = document.getElementsByClassName('relacionados');
    while (relacionados.length > 0) {
      relacionados[0].classList.remove("relacionados");
    }

    let seleccionados = document.getElementsByClassName('seleccionado');
    while (seleccionados.length > 0) {
      seleccionados[0].classList.remove("seleccionado");
    }
  }

  nuevoReto() {

    swal({
      title: '¿Quieres guardar las tareas de este reto?',
      //text: `¿Quieres guardar las tareas de este reto?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'No, gracias',
      confirmButtonClass: 'btn  btn-primary boton',
      cancelButtonClass: 'btn btn-primary boton',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        //Nuevo reto
        this.quiereGuardarElReto();

      } else if (!result.value) {

        sessionStorage.removeItem('seleccion');
        this.router.navigate(['/reto/tareas']);

      } else if (result.dismiss) {
        swal.close();
      }
    });
  }

  nuevoJuego() {
    swal({
      title: '¿Seguro que quieres cambiar de juego?',
      //text: `¿Quieres guardar las tareas de este reto?`,
      //type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Nuevo juego',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-primary boton',
      cancelButtonClass: 'btn btn-primary boton',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.router.navigate(['/reto/juegos']);

      } else {
        //Nuevo reto
        this.quiereGuardarElReto();
      }
    });
  }


  retoTerminado() {
    swal({
      title: 'Has terminado tu reto!<br> Qué quieres hacer?',
      text: `¿Puedes continuar con este reto o crear uno nuevo?`,
      //type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuar!',
      cancelButtonText: 'Nuevo reto!',
      confirmButtonClass: 'btn btn-primary boton',
      cancelButtonClass: 'btn btn-primary boton',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.duplicarReto();
        this.router.navigate(['./' + `${this.tarea}`], { relativeTo: this.route });

      } else {
        if (!this.authService.isAuthenticated()) {
          sessionStorage.removeItem('seleccion');
          this.router.navigate(['reto/tareas']);
        } else {
          this.quiereGuardarElReto();
        }

      }
    });
  }

  duplicarReto() {
    //Duplicar reto
    let tareas = this.reto.tareasSeleccionadas;
    let l = tareas.length;

    for (let a = 0; a < l; a++) {
      let tarea: Tarea = { ...this.reto.tareasSeleccionadas[a] };
      tarea.valoracion = new Valoracion();
      this.reto.tareasSeleccionadas.push(tarea);
    }
    this.reto.tareaActual = l;
    this.ls.setSeleccion(this.reto);
  }

  quiereGuardarElReto() {
    //Permitir sólo si está logeado
    if (!this.authService.isAuthenticated()) {
      this.noEsUsuarioRegistrado();
    }

    //Datos provisionales
    //this.reto tien más datos que los que hacen falta en back ,
    //por eso uso un bojeto data que es igual que el reto de back
    let data = {
      id: '',
      nombre: 'Asier',
      created: "2021-03-23",
      updated: null,
      userId: 3,
      tareas: this.reto.tareasSeleccionadas
    };

    this.retoService.create(data)
      .subscribe(
        reto => {
          this.reto = reto;
          swal('Reto guardado', `Tu reto  ` + this.reto.nombre + ` se ha guardado correctamente.`, 'success');
          sessionStorage.removeItem('seleccion');
          this.router.navigate(['reto/tareas']);

        },
        err => {
          //this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  fixFontSize() {
    var len_fit = 10; // According to your question, 10 letters can fit in.
    let username = document.getElementById('username');

    // Get the lenght of user name.
    var len_user_name = username.innerText.length;
    let new_size = 10 / len_user_name;
    username.style.fontSize = new_size + " rem";

  }

  openModal() {
    this.tareaModalService.open();
    this.open = true;
  }

  noEsUsuarioRegistrado() {
    swal({
      title: 'Es necesario ser usuario registrado',
      text: `¿Quieres registrarte?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Siiiiii!',
      cancelButtonText: 'No gracias',
      confirmButtonClass: 'btn btn-primary boton',
      cancelButtonClass: 'btn btn-primary boton',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        //Registrarse
        this.router.navigate(['registro-bg/registro']);

      } else {
        swal.close();
      }
    });
  }

}
