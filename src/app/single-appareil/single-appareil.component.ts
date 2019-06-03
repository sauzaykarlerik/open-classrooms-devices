import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {
  name = 'Appareil';
  status = 'Statut';

  constructor(private appareilService: AppareilService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const appareil = this.appareilService.getAppareilById(+id);
    this.name = appareil.name;
    this.status = appareil.status;
  }
}
