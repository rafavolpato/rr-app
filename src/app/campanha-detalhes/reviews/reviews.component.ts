import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CampanhasService} from '../../campanhas/campanhas.service'

import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private campanhasService: CampanhasService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.campanhasService
      .reviewsOfCampanha(this.route.parent.snapshot.params['id'])
  }

}
