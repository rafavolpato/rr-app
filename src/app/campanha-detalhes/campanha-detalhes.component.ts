import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'

import {CampanhasService} from '../campanhas/campanhas.service'
import {Campanha} from '../campanhas/campanha/campanha.model'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'

@Component({
  selector: 'mt-campanha-detalhes',
  templateUrl: './campanha-detalhes.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class CampanhaDetalhesComponent implements OnInit {

  campanha: Campanha
  searchBarState = 'hidden'

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private campanhasService: CampanhasService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
      this.searchControl = this.fb.control('')
      this.searchForm = this.fb.group({
        searchControl: this.searchControl
      })

      this.searchControl.valueChanges
         .debounceTime(500)
          .distinctUntilChanged()
          .switchMap(
            searchTerm =>
              this.campanhasService.produtosCampanha(this.route.snapshot.params['id'], searchTerm))
          .subscribe(res =>
            this.campanhasService.updateProdutoCampanha(res)
            )

          this.campanhasService.produtosCampanha(this.route.snapshot.params['id'])
          .subscribe(produtoCampanha => this.campanhasService.updateProdutoCampanha(produtoCampanha))

    }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }


}
