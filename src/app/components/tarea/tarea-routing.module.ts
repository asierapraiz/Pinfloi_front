import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareaComponent } from './tarea/tarea.component';
import { SumaComponent } from './suma/suma.component';
import { RestaComponent } from './resta/resta.component';
import { MensajeComponent } from './mensaje/mensaje.component';


const tareaRoutes: Routes = [
  {
    path: '',
    component: TareaComponent,
    //canActivate: [AuthGuard],
    children: [      
          { path: 'suma', component: SumaComponent, data: {animation: 'SumaPage'}  },
          { path: 'resta', component: RestaComponent, data: {animation: 'RestaPage'}  },
          { path: 'mensaje', component: MensajeComponent, data: {animation: 'MensajePage'}  }     
    
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
