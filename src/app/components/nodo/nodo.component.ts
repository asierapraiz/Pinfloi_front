import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/service/auth.service';
import { LocalStorageService } from "../../core/services/local-storage.service";





@Component({
  selector: 'app-nodo',
  templateUrl: './nodo.component.html',
  styleUrls: ['./nodo.component.scss']
})
export class NodoComponent implements OnInit {

  constructor(
    private localStorage: LocalStorageService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  noTieneCuenta() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
    this.router.navigate(['/nodo-bg/nodo-dos']);
  }

}
