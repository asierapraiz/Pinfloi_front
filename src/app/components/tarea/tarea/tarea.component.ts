import { ElementRef, HostBinding, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { routeAnimations, flyInOut } from './../../../animations';
import { TareaService } from './../services/tarea.service';
import { RetoService } from './../../reto/services/reto.service';;
import { Avatar } from '../../../core/models/avatar.model';
import { Tarea } from '../../../core/models/tarea.model';
import { LocalStorageService } from "./../../../core/services/local-storage.service";
import { Reto } from "../../../core/models/reto.model";
import swal from 'sweetalert2';
import { Valoracion } from '../../../core/models/valoracion.model';
import { Constants } from '../../../global/constants';
import { UsuarioService } from './../../usuarios/service/usuario.service';
import { AuthService } from '../../usuarios/service/auth.service';
import { TareaModalService } from './../../../core/services/tarea-modal.service';






@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  animations: [routeAnimations, flyInOut],
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
    private authService: AuthService,
    public tareaModalService: TareaModalService) {


    this.reto = this.ls.getSeleccion();
    this.mostrarUsuario();

    //Si es la primera vuelta y no hay tareaActual
    if (!this.reto.tareaActual) {
      this.reto.tareaActual = 0;
      ls.setSeleccion(this.reto);
    }
    this.tarea = this.reto.tareasSeleccionadas[this.reto.tareaActual].name;

    this.tarea == 'tablas' ? this.showDragables = false : true;

    //Si ya ha realizado toda las teras del reto ...
    if (this.reto.tareaActual == 0 && this.reto.tareasSeleccionadas[this.reto.tareasSeleccionadas.length - 1].valoracion != null) {
      this.retoTerminado();
    } else {
      this.router.navigate(['./' + `${this.tarea}`], { relativeTo: this.route });
    }
  }



  ngOnInit(): void {

    this.ls.getTablasHechas() ? this.tablasHechas = this.ls.getTablasHechas() : '';
    //this.avatar = this.reto.avatar;
    this.tareasSeleccionadas = this.reto.tareasSeleccionadas;

    if (this.authService.isAuthenticated()) {
      this.nombre = this.authService.usuario.nombre;
    } else {
      this.reto = this.ls.getSeleccion();
      this.nombre = this.reto.nombre;
      this.avatar = this.reto.avatar;

    }
  }



  ngAfterViewInit() {
    //Añado los eventos en los elementos de las opciones
    let opciones = this.elementRef.nativeElement.querySelectorAll('.draggable');
    opciones.forEach((anchor: HTMLElement) => {
      anchor.addEventListener('click', this.seleccionaOpcion.bind(this))
    })

    this.ts.seleccionaHueco$.subscribe(
      (hueco) => {
        this.huecoSeleccionado = hueco;
      }
    );

    this.ts.seleccionaOpcion$.subscribe(
      (opcion) => {
        this.seleccionaOpcion(opcion);
      }
    );

    this.ts.tablaHecha$.subscribe(
      (ladel) => {
        this.tablasHechas.push(ladel);
        this.ls.setTablasHechas(this.tablasHechas);
        this.ajugar();
      }
    );
    document.getElementById('pizarra').addEventListener('click', this.limpiaTodo);

    this.fixFontSize();
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
    console.log(this.avatar);
    console.log(this.nombre);

  }

  noHaySeleccion() {
    alert("NO hay reto");
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

    if (this.huecoSeleccionado.textContent == this.huecoSeleccionado.attributes['data-valor'].value) {

      if (parseInt(this.huecoSeleccionado.textContent) > 9) {
        this.huecoSeleccionado.classList.add('font-size-min');
      }
      this.inputs = document.getElementsByClassName("target").length;
      this.huecoSeleccionado.classList.add('acierto');
      this.aciertos++;
      console.log("Inp  =>" + this.inputs + "-----Aciertos:" + this.aciertos);
      console.log("Tarea actual  =>" + this.reto.tareaActual);

      if (this.aciertos == this.inputs) {
        //Muestro modal y navego a juego   
        console.log("Tarea actual  =>" + this.reto.tareaActual);

        console.log(this.reto);

        this.reto.tareasSeleccionadas[this.reto.tareaActual].valoracion = this.valora();
        this.ajugar();

      }
    } else {
      this.huecoSeleccionado.classList.remove('acierto');
      this.huecoSeleccionado.classList.add('error');


      this.errores++;
      if (this.errores > 2) {

        setTimeout(() => {
          this.errores = 0;
          this.intentos++;
          this.router.navigate(['./mensaje'], { relativeTo: this.route });
        }, 2000);

      }
    }

    this.limpiaRelacionados();

  }

  valora(): Valoracion {
    let nota = 0;
    nota = 10;
    let valoracion: Valoracion = { 'id': null, 'aciertos': this.aciertos, 'errores': this.errores, 'intentos': this.intentos, 'nota': nota };

    return valoracion;
  }

  ajugar() {
    setTimeout(() => {
      swal({
        title: 'Muy bienn!',
        text: `Te mereces una partida.`,
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Vamos!',
      }).then((result) => {
        setTimeout(() => {
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
      title: 'Nuevo reto',
      text: `¿Quieres guardar las tareas de este reto?`,
      //type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Nuevo reto',
      cancelButtonText: 'Guardar',
      confirmButtonClass: 'btn btn-primary ',
      cancelButtonClass: 'btn btn-primary',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.router.navigate(['/reto/tareas']);

      } else {
        //Nuevo reto
        this.quiereGuardarElReto();
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
      confirmButtonClass: 'btn btn-primary ',
      cancelButtonClass: 'btn btn-primary',
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
      title: 'Has terminado tu reto, que quieres hacer?',
      text: `¿Puedes continuar con este reto o crear uno nuevo?`,
      //type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuar!',
      cancelButtonText: 'Nuevo reto!',
      confirmButtonClass: 'btn btn-primary ',
      cancelButtonClass: 'btn btn-primary',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        //Duplicar reto
        let tareas = this.reto.tareasSeleccionadas;
        let l = tareas.length;

        for (let a = 0; a < l; a++) {
          let tarea: Tarea = { ...this.reto.tareasSeleccionadas[a] };
          tarea.valoracion = new Valoracion();
          this.reto.tareasSeleccionadas.push(tarea);
        }

        this.reto.tareaActual = l;

        this.router.navigate(['./' + `${this.tarea}`], { relativeTo: this.route });

      } else {
        //Nuevo reto
        this.quiereGuardarElReto();
      }
    });
  }

  quiereGuardarElReto() {

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
          //this.router.navigate(['/clientes']);           
          this.reto = reto;
          swal('Reto guardado', `Tu reto  ` + this.reto.nombre + ` se ha guardado correctamente.`, 'success');
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

}
