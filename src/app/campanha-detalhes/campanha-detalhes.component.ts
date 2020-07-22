import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

import {CampanhasService} from '../campanhas/campanhas.service'

import {Campanha} from '../campanhas/campanha/campanha.model'

@Component({
  selector: 'mt-campanha-detalhes',
  templateUrl: './campanha-detalhes.component.html'
})
export class CampanhaDetalhesComponent implements OnInit {

  campanha: Campanha

  constructor(private campanhasService: CampanhasService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.campanhasService.campanha(this.route.snapshot.params['id'])
      .subscribe(campanha => this.campanha = campanha)
  }

}
