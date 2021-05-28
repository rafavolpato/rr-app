import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CampanhasService} from '../../campanhas/campanhas.service'
import {ProdutoCampanha} from './produto-campanha.model'

import {Observable} from 'rxjs/Observable'

import { Subscription } from 'rxjs/Subscription';
import { Page } from 'app/shared/page/page.model';
import { PageService } from '../../shared/page/page.service';

@Component({
  selector: 'mt-produtoCampanha',
  templateUrl: './produto-campanha.component.html'
})

export class ProdutoCampanhaComponent implements OnInit {

  produtoCampanha: ProdutoCampanha[]
  page: Page
  subscription: Subscription

  constructor(private campanhasService: CampanhasService,
              private pageService: PageService,
              private route: ActivatedRoute)
  {
    this.subscription = campanhasService.getProdutoCampanha()
    .subscribe(mymessage => { this.page = mymessage
      this.produtoCampanha = this.page.results;
      }
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  next() {
    this.pageService.nextpage(this.page)
      .subscribe(page => {
        console.log(page)
        this.produtoCampanha.push(...page.results)
        this.page = page
      })
  }

}
