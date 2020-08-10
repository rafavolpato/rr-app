import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {MEAT_API} from '../app.api'
import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class MyordersService {
}
