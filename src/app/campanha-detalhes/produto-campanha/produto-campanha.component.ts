import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CampanhasService} from '../../campanhas/campanhas.service'
import {ProdutoCampanha} from '../produto/produto-campanha.model'

import {Observable} from 'rxjs/Observable'

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mt-produtoCampanha',
  templateUrl: './produto-campanha.component.html'
})

export class ProdutoCampanhaComponent implements OnInit {

  produtoCampanha: ProdutoCampanha[]
  subscription: Subscription

  constructor(private campanhasService: CampanhasService,
              private route: ActivatedRoute)
  {
    this.subscription = campanhasService.getProdutoCampanha()
    .subscribe(mymessage =>  this.produtoCampanha = mymessage)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
