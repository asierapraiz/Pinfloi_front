import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-historico',
  templateUrl: './modal-historico.component.html',
  styleUrls: ['./modal-historico.component.scss']
})
export class ModalHistoricoComponent implements OnInit {

  nombre: string= "Asier";
  tarea: string= "suma";
  constructor() { }

  ngOnInit(): void {
  }

}
