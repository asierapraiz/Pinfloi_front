import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumaComponent } from './suma/suma.component';
import { TareaComponent } from './tarea/tarea.component';
import { RestaComponent } from './resta/resta.component';
import { TareaRoutingModule } from './tarea-routing.module';
import { MensajeComponent } from './mensaje/mensaje.component';
import { SafePipe } from './../../pipes/safe.pipe';
import { RestaConComponent } from './resta-con/resta-con.component';
import { SumaConComponent } from './suma-con/suma-con.component';
import { TablasComponent } from './tablas/tablas.component';
import { MultiplicarComponent } from './multiplicar/multiplicar.component';



@NgModule({
  declarations: [
    SumaComponent,
    TareaComponent,
    RestaComponent,
    MensajeComponent,
    SafePipe,
    RestaConComponent,
    SumaConComponent,
    TablasComponent,
    MultiplicarComponent
  ],
  imports: [
    CommonModule,
    TareaRoutingModule
  ]
})
export class TareaModule { }
