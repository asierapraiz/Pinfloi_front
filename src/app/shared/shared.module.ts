import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    PaginatorComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
    PaginatorComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
