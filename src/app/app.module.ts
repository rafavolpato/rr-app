import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {LocationStrategy, HashLocationStrategy} from '@angular/common'

import {ROUTES} from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CampanhasComponent } from './campanhas/campanhas.component';
import { CampanhaComponent } from './campanhas/campanha/campanha.component';
import { CampanhaDetalhesComponent } from './campanha-detalhes/campanha-detalhes.component';
import { ProdutoComponent } from './campanha-detalhes/produto/produto.component';
import { ShoppingCartComponent } from './campanha-detalhes/shopping-cart/shopping-cart.component';
import { ProdutoCampanhaComponent } from './campanha-detalhes/produto-campanha/produto-campanha.component';
import { ReviewsComponent } from './campanha-detalhes/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component'
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { RegisterComponent } from './security/register/register.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyorderItemsComponent } from './myorders/myorder-items/myorder-items.component';

import {registerLocaleData} from '@angular/common';
import br from '@angular/common/locales/br';
registerLocaleData(br, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CampanhasComponent,
    CampanhaComponent,
    ProdutoCampanhaComponent,
    ProdutoComponent,
    ShoppingCartComponent,
    ProdutoCampanhaComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    CampanhaDetalhesComponent,
    LoginComponent,
    UserDetailComponent,
    RegisterComponent,
    MyordersComponent,
    MyorderItemsComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
