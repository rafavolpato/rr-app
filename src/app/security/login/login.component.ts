import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService, Token } from './login.service';
import { NotificationService } from 'app/shared/messages/notification.service';
import { ShoppingCartService } from 'app/campanha-detalhes/shopping-cart/shopping-cart.service';
import { forEach } from '@angular/router/src/utils/collection';
import { CartItem } from 'app/campanha-detalhes/shopping-cart/cart-item.model';
import { Location } from '@angular/common';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup
  navigationTo: string

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {}

  ngOnInit() {
    this.loginform = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    })
//    this.navigationTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
  }

  login() {
    this.loginService.login(this.loginform.value.email, this.loginform.value.password)
    .subscribe(
      token => {this.buscarPessoa()},
      response => {
        if (response.status === 401) {
          this.notificationService.notify('Usuário não cadastrado!')
        }else{
          this.notificationService.notify('Erro ao fazer o Login!')
        }
        this.loginService.token = undefined
        this.loginService.pessoa = undefined})
  }

  buscarPessoa() {
    if (this.loginService.token !== undefined) {
      this.loginService.getPessoaByEmail(this.loginform.value.email)
      .subscribe(
        pessoa => {this.notificationService.notify(`Bem vindo(a)! ${pessoa[0].nome}`)
                  //this.router.navigate([atob(this.navigationTo)])
                  console.log(this.location)
                  this.location.back();
                  this.atualizarCarrinho()
        },
        response => {
          this.notificationService.notify('Erro ao fazer o Login!')
          this.loginService.token = undefined
          this.loginService.pessoa = undefined
        }
      )
    }
  }
  atualizarCarrinho() {
    if (this.loginService.isLoggedIn) {
      this.shoppingCartService.atualizarCarrinho()
      .subscribe(
        carrinho => {
          this.shoppingCartService.carrinho = []
          this.shoppingCartService.order = undefined
          carrinho.forEach(item =>
            this.shoppingCartService.carrinho.push(new CartItem(item))
          )
          if (carrinho[0] !== undefined) {
            this.shoppingCartService.order = carrinho[0].idCompra
          }
        }
      )
    }
  }

  register() {
    this.router.navigate(['/register'])
  }

}
