import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CampanhasService} from '../../campanhas/campanhas.service'
import {ProdutoCampanha} from '../produto/produto-campanha.model'

import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'mt-produtoCampanha',
  templateUrl: './produto-campanha.component.html'
})

export class ProdutoCampanhaComponent implements OnInit {

  produtoCampanha: Observable<ProdutoCampanha[]>

  constructor(private campanhasService: CampanhasService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.produtoCampanha = this.campanhasService
      .produtosCampanha(this.route.parent.snapshot.params['id'])
  }

//  addProdutoCampanha(produto: ProdutoCampanha){
//    console.log('add produto')
//    console.log(produto)
//  }
}
