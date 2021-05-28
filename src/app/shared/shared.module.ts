import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {InputComponent} from './input/input.component'
import {RadioComponent} from './radio/radio.component'
import {RatingComponent} from './rating/rating.component'

import {OrderService} from '../order/order.service'
import {ShoppingCartService} from '../campanha-detalhes/shopping-cart/shopping-cart.service'
import {CampanhasService} from '../campanhas/campanhas.service';
import {SnackbarComponent} from './messages/snackbar/snackbar.component';

import {NotificationService} from './messages/notification.service'
import { LoginService } from 'app/security/login/login.service'
import { LoggedInGuard } from 'app/security/loggedin.guard'
import { RegisterService } from 'app/security/register/register.service'
import { MyordersService } from 'app/myorders/myorders.service'
import { DataService } from 'app/shared/data/data.service'
import { PageService } from './page/page.service';

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent, SnackbarComponent,
            RatingComponent, CommonModule,
            FormsModule, ReactiveFormsModule ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:[
        ShoppingCartService,
        CampanhasService,
        OrderService,
        NotificationService,
        LoginService,
        LoggedInGuard,
        RegisterService,
        MyordersService,
        PageService,
        DataService]
    }
  }
}
