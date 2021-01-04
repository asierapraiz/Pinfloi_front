import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumaComponent } from './suma/suma.component';
import { TareaComponent } from './tarea/tarea.component';
import { RestaComponent } from './resta/resta.component';
import { TareaRoutingModule } from './tarea-routing.module';
import { MensajeComponent } from './mensaje/mensaje.component';
import { SafePipe } from './../../pipes/safe.pipe';


@NgModule({
  declarations: [
    SumaComponent, 
    TareaComponent, 
    RestaComponent, 
    MensajeComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    TareaRoutingModule   
  ]
})
export class TareaModule { }
