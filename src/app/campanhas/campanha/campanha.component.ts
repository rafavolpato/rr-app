import { Component, OnInit, Input } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'

import {Campanha} from './campanha.model'

@Component({
  selector: 'mt-campanha',
  templateUrl: './campanha.component.html',
  animations: [
    trigger('campanhaAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})
export class CampanhaComponent implements OnInit {

  campanhaState = 'ready'

  @Input() campanha: Campanha

  constructor() { }

  ngOnInit() {
  }

}
