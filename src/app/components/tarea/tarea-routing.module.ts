import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareaComponent } from './tarea/tarea.component';
import { SumaComponent } from './suma/suma.component';
import { SumaConComponent } from './suma-con/suma-con.component';
import { RestaComponent } from './resta/resta.component';
import { RestaConComponent } from './resta-con/resta-con.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { TablasComponent } from './tablas/tablas.component';
import { MultiplicarComponent } from './multiplicar/multiplicar.component';
import { MultiplicarDeDosComponent } from './multiplicar-de-dos/multiplicar-de-dos.component';





const tareaRoutes: Routes = [
  {
    path: '', component: TareaComponent, data: { animation: 'TareaPage' },
    //canActivate: [AuthGuard],
    children: [
      { path: 'suma', component: SumaComponent, data: { animation: 'SumaPage' } },
      { path: 'sumaCon', component: SumaConComponent, data: { animation: 'SumaConPage' } },
      { path: 'resta', component: RestaComponent, data: { animation: 'RestaPage' } },
      { path: 'restaCon', component: RestaConComponent, data: { animation: 'RestaConPage' } },
      { path: 'mensaje', component: MensajeComponent, data: { animation: 'MensajePage' } },
      { path: 'tablas-2-5', component: TablasComponent, data: { animation: 'TablasPage' } },
      { path: 'tablas-6-9', component: TablasComponent, data: { animation: 'TablasPage' } },
      { path: 'multiplicarDe1', component: MultiplicarComponent, data: { animation: 'TablasPage' } },
      { path: 'multiplicarDe2', component: MultiplicarDeDosComponent, data: { animation: 'TablasPage' } }
    ]
  }
];

@NgModule({

  declarations: [],
  imports: [
    RouterModule.forChild(tareaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TareaRoutingModule { }
