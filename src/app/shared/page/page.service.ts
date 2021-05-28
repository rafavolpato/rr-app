import { LoginService } from 'app/security/login/login.service';
import { Observable } from 'rxjs/Observable';
import { MEAT_API } from './../../app.api';
import {Injectable} from '@angular/core'

import {HttpClient, HttpHeaders} from '@angular/common/http'

import { Page } from './page.model'


@Injectable()
export class PageService {

  constructor(private http: HttpClient,
    private loginService: LoginService
  ){}


  nextpage(page: Page): Observable<Page> {
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    return this.http.get<Page>(`${page.next}`,
    {headers:headers})
  }

}
