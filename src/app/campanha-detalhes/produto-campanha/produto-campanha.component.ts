import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CampanhasService} from '../../campanhas/campanhas.service'
import {ProdutoCampanha} from './produto-campanha.model'

import {Observable} from 'rxjs/Observable'

import { Subscription } from 'rxjs/Subscription';
import { Page } from 'app/shared/page/page.model';

@Component({
  selector: 'mt-produtoCampanha',
  templateUrl: './produto-campanha.component.html'
})

export class ProdutoCampanhaComponent implements OnInit {

  produtoCampanha: ProdutoCampanha[]
  page: Page
  subscription: Subscription
  numbers: number[]

  constructor(private campanhasService: CampanhasService,
              private route: ActivatedRoute)
  {
    this.subscription = campanhasService.getProdutoCampanha()
    .subscribe(mymessage => { this.page = mymessage
      this.produtoCampanha = this.page.results
      this.numbers = Array(this.page.count  ).fill(0).map((x,i)=>i);
      }
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchNext() {

  }

  // function fetches the previous paginated items by using the url in the previous property
  fetchPrevious() {

  }


}
