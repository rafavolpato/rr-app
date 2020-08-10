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
import {Register}  from './register.model'

export class Token {
  access: string
  refresh: string
}

@Injectable()
export class RegisterService {

    token: Token
//    pessoa: Pessoa
    register2: Register
    lastUrl: string

    constructor(private http: HttpClient, private router: Router){
      this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe( (e: NavigationEnd) => this.lastUrl = e.url)
    }

    cadastrar(register: Register): Observable<Register>{
      console.log('antes post')
      console.log(register)
      return this.http.post<Register>(`${MEAT_API}register/`,
      register)
    }

    handleLogin(path: string = this.lastUrl) {
      this.router.navigate(['./login', btoa(path)])
    }

}

