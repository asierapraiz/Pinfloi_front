import { Component, OnInit } from '@angular/core';
import { slideInAnimation, fadeInAnimation } from './../../../animations/index';
import { TareaService } from './../services/tarea.service';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  animations: [fadeInAnimation],
  host: { '[@routeAnimations]': '' },
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {

  constructor(private ts: TareaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.router.navigate(['../suma'], { relativeTo: this.route });
    }, 3000);


  }

}
