import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './../app/shared/shared.module';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/clientes/form.component';
import { ClienteService } from './components/clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { AuthGuard } from './components/usuarios/guards/auth.guard';
import { RoleGuard } from './components/usuarios/guards/role.guard';
import { TokenInterceptor } from './components/usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './components/usuarios/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './components/facturas/detalle-factura.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { UsuarioService } from './components/usuarios/service/usuario.service';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecuperarPassComponent } from './components/usuarios/recuperar-pass/recuperar-pass.component';
import { ChangePassComponent } from './components/usuarios/change-pass/change-pass.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingComponent } from './components/landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NombreFormComponent } from './components/nombre-form/nombre-form.component';
import { AvatarFormComponent } from './components/avatar-form/avatar-form.component';
import { JuegoComponent } from './components/juego/juego.component';
import { SumaOldComponent } from './components/tareas/suma/suma-old.component';
import { TareaOldComponent } from './components/tareas/tarea/tarea-old.component';
import { ModalCambiarComponent } from './components/tareas/modals/modal-cambiar/modal-cambiar.component';
import { ModalHistoricoComponent } from './components/tareas/modals/modal-historico/modal-historico.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





registerLocaleData(localeES, 'es');

const routes: Routes = [
  { path: 'landing', component: LandingComponent, data: { animation: 'LandingPage' } },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'login', component: LoginComponent },
  { path: 'facturas/:id', component: DetalleFacturaComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_USER' } },
  { path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar_pass', component: RecuperarPassComponent },
  { path: 'user/changePassword', component: ChangePassComponent },
  { path: 'nombre', component: NombreFormComponent, data: { animation: 'NameFormPage' } },
  { path: 'avatar', component: AvatarFormComponent, data: { animation: 'AvatarFormPage' } },
  { path: 'juego/:id', component: JuegoComponent, data: { animation: 'GamePage' } },
  { path: 'tareas/suma', component: SumaOldComponent },
  {
    path: 'tarea', loadChildren: () => import('./components/tarea/tarea.module').then(m => m.TareaModule)
  },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent,
    RegistroComponent,
    RecuperarPassComponent,
    ChangePassComponent,
    LandingComponent,
    NombreFormComponent,
    AvatarFormComponent,
    JuegoComponent,
    SumaOldComponent,
    TareaOldComponent,
    ModalCambiarComponent,
    ModalHistoricoComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule, MatDatepickerModule, MatMomentDateModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule,
    FontAwesomeModule, NgbModule
  ],
  providers: [ClienteService, UsuarioService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
