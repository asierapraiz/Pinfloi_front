import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PopperDirective } from './../core/directives/popper.directive';
import { NoSlashPipe } from '../pipes/noSlash.pipe';
import { ValoracionIconComponent } from './valoracion-icon/valoracion-icon.component';


@NgModule({
  declarations: [
    PaginatorComponent,
    HeaderComponent,
    FooterComponent,
    PopperDirective,
    NoSlashPipe,
    ValoracionIconComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
    PaginatorComponent,
    HeaderComponent,
    FooterComponent,
    PopperDirective,
    CommonModule,
    RouterModule,
    NoSlashPipe,
    ValoracionIconComponent
  ]
})
export class SharedModule { }
