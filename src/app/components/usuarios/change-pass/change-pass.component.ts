import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../service/usuario.service';
import { Router , ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  titulo: string = 'Por favor Sign In!'; 
  newPass: string;
  errores: string[];  
  token: string;

  constructor(private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
    });
  }

  enviar(){     

    if (this.newPass == null) {
      swal('Error ', 'El password es obligatorio', 'error');
      return;
    }
    console.log(JSON.stringify(this.newPass));
    this.usuarioService.changePass(this.newPass, this.token).subscribe(
      usuario => {
        this.router.navigate(['/clientes']);
        swal('Recuperación de password', `Se le ha envia do un correo para recupera su password`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );      
       
  }

  

}

