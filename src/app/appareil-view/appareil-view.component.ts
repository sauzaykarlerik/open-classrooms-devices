import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  isAuth = false;
  lastUpdate = new Promise((resolve) => {
    const date = new Date();
    setTimeout(() => {
      resolve(date);
    }, 2000);
  });
  appareils: any[];
  appareilSubscription: Subscription;

  constructor(private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe((appareils: any[]) => {
      this.appareils = appareils;
    });
    this.appareilService.emitAppareilSubject();
  }

  onAllumer(): void {
    this.appareilService.switchOnAll();
  }

  onEteindre(): void {
    this.appareilService.switchOffAll();
  }

  onSave() {
    this.appareilService.saveAppareilsToServer();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }
}
