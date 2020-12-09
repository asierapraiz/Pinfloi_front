import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../services/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css']
})
export class RecuperarPassComponent implements OnInit {

  titulo: string = 'Por favor Sign In!'; 
  email: string;
  errores: string[];  

  constructor(private usuarioService: UsuarioService, private router: Router) {   
  }

  ngOnInit() {
  }
/*
  enviar(){       

    if (this.email == null) {
      swal('Error Login', 'El email es obligatorio', 'error');
      return;
    }
    console.log(JSON.stringify(this.email));
    this.usuarioService.recuperaPass(this.email).subscribe(
      usuario => {
        this.router.navigate(['/clientes']);
        swal('Recuperaciín de password', `Se le ha envia do un correo para recupera su password`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );      
       
  }*/

  

}
