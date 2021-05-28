import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import {Router} from '@angular/router'
import {OrderService} from '../../order/order.service'
import {Pessoa} from '../../pessoa/pessoa.model'
import {User} from '../user.model'
import {Register} from './register.model'
import {RegisterService} from './register.service';
import { NotificationService } from 'app/shared/messages/notification.service';

@Component({
  selector: 'mt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  registerForm: FormGroup
  user: User


  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private notificationService: NotificationService) {}

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        cpfcnpj: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        numero: this.formBuilder.control('', [Validators.required]),
        complemento: this.formBuilder.control(''),
        bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        uf: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
        cep: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
        telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(12)]),
//        password_group:this.formBuilder.group(
//          {
          password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
          passwordConfirmation: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
//          }
//          {
//          validator: this.passwordConfirming
//          }
//        )
      })
//       {validator: RegisterComponent.EqualsTo})
    }

    // tslint:disable-next-line: member-ordering
    static EqualsTo(group: AbstractControl): {[key:string]: boolean} {
      const email = group.get('email')
      const emailConfirmation = group.get('emailConfirmation')
      if(!email || !emailConfirmation){
        return undefined
      }
      if(email.value !== emailConfirmation.value){
        return {emailsNotMatch:true}
      }
      return undefined
    }

    passwordConfirming(): boolean {
      const password =  this.registerForm.value .password
      const passwordConfirmation =  this.registerForm.value.passwordConfirmation
      console.log(password)
      console.log(passwordConfirmation)
      if(!password || !passwordConfirmation){
        return false
      }
      if(password !== passwordConfirmation){
        return true
      }
      console.log('return fals')
      return false
    }

    cadastrar () {
      let register = new Register

      if (this.registerForm.value.cpfcnpj.toString().length > 11){
        register.tipoPessoa = 2
      } else {
        register.tipoPessoa = 1
      }
      register.cpfCnpj = this.registerForm.value.cpfcnpj
      register.nome = this.registerForm.value.nome
      register.endereco = this.registerForm.value.endereco
      register.complemento = this.registerForm.value.complemento
      register.numero = this.registerForm.value.numero
      register.bairro = this.registerForm.value.bairro
      register.cidade = this.registerForm.value.cidade
      register.uf = this.registerForm.value.uf
      register.cep = this.registerForm.value.cep
      register.email = this.registerForm.value.email
      register.password = this.registerForm.value.password
      register.telefone = this.registerForm.value.telefone
      this.registerService.cadastrar(register)
        .subscribe(
          () => {this.notificationService.notify('Cadastro realizado com sucesso!')
                this.router.navigate(['/login'])},
          response => {
            let msg = ((response.error === null) || (response.error === undefined)) ? ' ' : response.error
            this.notificationService.notify(msg
             + '(' + response.status + ':' + response.statusText + ')');
            })
    }
}
