import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() login: string;
  @Input() senha: string;
  erroLogin: string;

  constructor(private _http: HttpClient, private _router: Router, private _loginService: LoginService) { }

  ngOnInit() {
    if (sessionStorage['user']) {
      this._router.navigate(['/home']);
    }
  }

  logar() {
    this._loginService.logarUsuario(this.login, this.senha).subscribe(
      retorno => this._router.navigate(['/home']),
      (erro: HttpErrorResponse) => {
        switch(erro.status) {
          case 401:
            this.erroLogin = 'Credenciais inválidas.';
            this._router.navigate(['/login']);
            break;
          default:
            this.erroLogin = 'Erro de servidor ao realizar a autenticação.';
        }
      }
    )
  }

}
