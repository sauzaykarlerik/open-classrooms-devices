import { Component, OnInit, Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() indexOfAppareil: number;
  @Input() id: number;

  constructor(private appareilService: AppareilService) {
  }

  ngOnInit() {
  }

  getStatus(): string {
    return this.appareilStatus;
  }

  getColor(): string {
    return this.appareilStatus === 'éteint' ? 'red' : 'green';
  }

  onSwitchOn() {
    this.appareilService.switchOnOne(this.indexOfAppareil);
  }

  onSwitchOff() {
    this.appareilService.switchOffOne(this.indexOfAppareil);
  }

}
