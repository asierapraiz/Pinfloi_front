import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './../usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'registro-app',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registro: FormGroup;
  titulo="Registro usuarios"; 
  enviando: boolean = false; 
  edad: number[]=[1,2,3,4,5,6,8,9,10,11,12];
  usuario: Usuario;
  errores: string[];

  error_messages = {
    'nombre': [
      { type: 'required', message: 'First Name is required.' },
    ],

    'apellido': [
      { type: 'required', message: 'Last Name is required.' }
    ],
    'username': [
      { type: 'required', message: 'Username is required.' },
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },
      { type: 'maxlength', message: 'Email length.' },
      { type: 'required', message: 'please enter a valid email address.' }
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
      { type: 'passwordNotMatch', message: 'Los paswords no coinciden.' }
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registro = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required
      ])),
      apellido: new FormControl('', Validators.compose([
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ])),
    }, { 
      validators: this.password.bind(this)
    });
  }

  ngOnInit() {
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  showPass(id){
    let pass= document.getElementById(id);
    let icon= document.getElementById(id+'-eye-icon');  

    if(pass.getAttributeNode('type').value=='password'){
      pass.setAttribute('type', 'text');
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');             
    }else{
      pass.setAttribute('type', 'password');      
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');          
    }
  }

  enviar(registro){
    this.enviando=true;
   
    if(!this.registro.valid){return;}   

    this.usuario = new Usuario(this.registro.value);   
    console.log(JSON.stringify(this.usuario));
    this.usuarioService.create(this.usuario).subscribe(
      usuario => {
        this.router.navigate(['/clientes']);
        swal('Nuevo usuario', `El cliente ${usuario.nombre} ha sido creado con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );      
       
  }
/*
  create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente)
      .subscribe(
        cliente => {
          this.router.navigate(['/clientes']);
          swal('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }*/

}
