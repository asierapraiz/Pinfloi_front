import { Component, OnInit } from '@angular/core';
import { RouterOutlet , Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resta',
  templateUrl: './resta.component.html',
  styleUrls: ['./resta.component.scss']
})
export class RestaComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['../suma'], { relativeTo: this.route });
  }

}
