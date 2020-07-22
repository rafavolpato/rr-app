import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'

import {ProdutoCampanha} from "./produto-campanha.model"

@Component({
  selector: 'mt-produto',
  templateUrl: './produto.component.html',
  animations: [
    trigger('produtoAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class ProdutoComponent implements OnInit {

  produtoState = 'ready'

  @Input() produto: ProdutoCampanha
  @Output() add = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  emitAddEvent(){
    this.add.emit(this.produto)
  }

}
