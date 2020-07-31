import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Router, NavigationEnd} from '@angular/router'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/filter'

import {MEAT_API} from '../../app.api'
import {ErrorHandler} from '../../app.error-handler'
import {Pessoa}  from '../../pessoa/pessoa.model'


export class Token {
  access: string
  refresh: string
}

@Injectable()
export class LoginService {

    token: Token
    pessoa: Pessoa
    lastUrl: string

    constructor(private http: HttpClient, private router: Router){
      this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe( (e: NavigationEnd) => this.lastUrl = e.url)
    }

    isLoggedIn() {
      return this.pessoa !== undefined
    }

    login(email: string, password: string): Observable<Token>{
      this.token = new Token
      return this.http.post<Token>(`${MEAT_API}api/token/`,
      {username: email, password: password})
      .do(token => {this.token = token
        console.log(token)})
    }

    getPessoaByEmail(email: string): Observable<Pessoa[]>{
      let headers = new HttpHeaders()
      headers = headers
      .set('authorization', `Bearer ${this.token.access}`)
      let params = new HttpParams().append('email', email)
      return this.http.get<Pessoa[]>(`${MEAT_API}pessoa/`,
      {headers:headers})
      .do(pessoa => this.pessoa = pessoa[0])
    }

    handleLogin(path: string = this.lastUrl) {
      this.router.navigate(['./login', btoa(path)])
    }

    logout() {
      this.token = undefined
      this.pessoa = undefined
    }
}

