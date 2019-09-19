import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutenticacaoService } from '../../shared/services/autenticacao.service';
import { NbSpinnerComponent } from '@nebular/theme';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loading = false;
  public msgErro: string;

  public form = new FormGroup({
    cpf: new FormControl(''),
    senha: new FormControl(''),
  });

  constructor(public autenticacaoService: AutenticacaoService,
              public localStorage: LocalStorageService,
              public router: Router) { }

  async logar(): Promise<void> {
    const dados = <{cpf: string, senha: string}>this.form.value;
    const form = {
      usuario: dados.cpf.replace(new RegExp(/[.\-]/, 'g'), ''),
      senha: dados.senha
    };
    this.loading = true;
    const response = await this.realizarLogin(form);
    if (!response.sucesso) {
      this.loading = false;
      this.msgErro = response.mensagem[0];
    } else {
      this.router.navigateByUrl('/home').catch(() => {
        this.loading = false;
      });
    }
  }

  async realizarLogin(dados): Promise<{sucesso: boolean, mensagem: string[]}> {
    this.msgErro = '';
    return await this.autenticacaoService.login(dados)
      .then(response => {
        if (response.sucesso) {
          this.localStorage.setJson('login', response.objeto);
          this.localStorage.set('token', response.objeto.token);
        }
        return {sucesso: response.sucesso, mensagem: response.sucesso ? null : response.mensagens};
      });
  }
}