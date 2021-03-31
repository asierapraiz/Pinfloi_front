import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';
  usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      swal('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/reto/tareas']);
    }

    console.log("routes");
    console.log(this.activatedRoute.snapshot.url); // array of states
    console.log(this.activatedRoute.snapshot.url[0].path);

    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('registro-bg');
    });
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;

      this.getAvatar(usuario);

    }, err => {
      if (err.status == 400) {
        swal('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
  }

  getAvatar(usuario) {

    this.usuarioService.getAvatar(usuario.id).subscribe(usuario => {
      if (usuario.avatar['boca'] == null) {
        this.router.navigate(['registro-bg/avatar']);
      } else {
        this.authService.guardarAvatar(usuario.avatar);
        this.router.navigate(['reto/tareas']);
      }
      swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
    });
  }
}
