import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'
import {CampanhasComponent} from './campanhas/campanhas.component'
import {CampanhaDetalhesComponent} from "./campanha-detalhes/campanha-detalhes.component"
import {ProdutoCampanhaComponent} from './campanha-detalhes/produto-campanha/produto-campanha.component'
//import {ReviewsComponent} from './campanha-detalhes/reviews/reviews.component'
import {OrderSummaryComponent} from './order-summary/order-summary.component'
import {NotFoundComponent} from './not-found/not-found.component'
import {LoginComponent} from "./security/login/login.component"
import { LoggedInGuard } from './security/loggedin.guard'
import { RegisterComponent } from './security/register/register.component'

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login/:to', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'campanhas', component: CampanhasComponent},
  {path: 'campanhas/:id', component: CampanhaDetalhesComponent,
    children: [
      {path: '', redirectTo: 'produto-campanha', pathMatch: 'full'},
      {path: 'produto-campanha', component: ProdutoCampanhaComponent},
    ]},
  {path: 'order', loadChildren: './order/order.module#OrderModule',
    canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
  {path: 'order-summary', component: OrderSummaryComponent},
  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: '**', component: NotFoundComponent}
]
