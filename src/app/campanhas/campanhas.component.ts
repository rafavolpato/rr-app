import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'

import {Campanha} from './campanha/campanha.model'
import {CampanhasService} from './campanhas.service'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'mt-campanhas',
  templateUrl: './campanhas.component.html',
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
export class CampanhasComponent implements OnInit {

  searchBarState = 'hidden'
  campanhas: Campanha[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private campanhasService: CampanhasService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
       .debounceTime(500)
        .distinctUntilChanged()
        .switchMap(searchTerm =>
          this.campanhasService
            .campanhas(searchTerm)
            .catch(error=>Observable.from([])))
        .subscribe(campanhas => this.campanhas = campanhas)

    this.campanhasService.campanhas()
      .subscribe(campanhas => {
        this.campanhas = campanhas})
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
