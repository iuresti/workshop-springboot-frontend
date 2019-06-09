import {Component, Input} from '@angular/core';
import {Card} from '../../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: []
})
export class CardComponent {

  @Input() card: Card;

  constructor() {
  }

}
