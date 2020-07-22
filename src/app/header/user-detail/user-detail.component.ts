import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../security/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router) { }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  login() {
    return this.loginService.handleLogin()
  }

  register() {
    this.router.navigate(['/register'])
  }

  logout() {
    return this.loginService.logout()
  }

  getNome(): string {
    if (this.loginService.pessoa !== undefined) {
      return this.loginService.pessoa.nome
    }
  }

  ngOnInit() {
  }

}
