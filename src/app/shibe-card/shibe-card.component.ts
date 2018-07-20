import { Component, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'shibe-card',
  templateUrl: './shibe-card.component.html',
  styleUrls: ['./shibe-card.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-900%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ShibeCardComponent {
  @Input() imageUrl: string;
  @Input() cardNumber: number;
  @Input() active: boolean;
  @Output() toggleState = new EventEmitter<number>();
  constructor() { }

  changeState() {
    this.active = !this.active;
    this.toggleState.emit(this.cardNumber);
  }

}
