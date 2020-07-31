import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Subject } from 'rxjs/Subject';

import {Campanha} from './campanha/campanha.model'
import {ProdutoCampanha} from '../campanha-detalhes/produto/produto-campanha.model'

import {MEAT_API} from '../app.api'
import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class CampanhasService {

    constructor(private http: HttpClient){}

    campanhas(search?: string): Observable<Campanha[]> {
//      return this.http.get(`${MEAT_API}campanha/`, {params: {q: search}})
      return this.http.get<Campanha[]>(`${MEAT_API}campanha/`)

    }

    campanha(search?: string): Observable<Campanha> {
      return this.http.get<Campanha>(`${MEAT_API}campanha/` + search + '/')

    }

    produtosCampanha(id: string, search?: string): Observable<ProdutoCampanha[]>{
      let params: HttpParams = undefined
      params = new HttpParams().append('idCampanha', id)
      if ((search !== null) && (search !== undefined)){
        params = new HttpParams().append('q', search)
      }
      return this.http.get<ProdutoCampanha[]>(`${MEAT_API}produtoCampanha/`, {params: params})

    }

    reviewsOfCampanha(id: string): Observable<any>{
      return this.http.get(`${MEAT_API}/campanhas/${id}/reviews`)
//        .map(response => response.json())
    }

    menuOfCampanha(id: string): Observable<ProdutoCampanha[]>{
      return this.http.get<ProdutoCampanha[]>(`${MEAT_API}/campanhas/${id}/menu`)
    }

    private produtoCampanhaSubject = new Subject<ProdutoCampanha[]>();

    getProdutoCampanha(): Observable<ProdutoCampanha[]> {
      return this.produtoCampanhaSubject.asObservable();
    }

    updateProdutoCampanha(message: ProdutoCampanha[]) {
      this.produtoCampanhaSubject.next(message);
    }

}

//.catch(err => {
//  return this.http.post<Token>(`${MEAT_API}api/token/refresh/`,
//    {refresh: this.token.refresh})
//    .do(token => {
//      console.log(token)
//      this.token.token = token})
