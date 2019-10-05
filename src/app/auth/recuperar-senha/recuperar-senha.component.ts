import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutenticacaoService } from '../../shared/services/autenticacao.service';
import { NbSpinnerComponent } from '@nebular/theme';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SessionStorageService } from '../../shared/services/session-storage.service';
import { FormatterService } from '../../shared/services/formatter.service';

@Component({
  selector: 'ngx-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent {
  public loading = false;
  public msgErro: string;
  public mensagemEnviada: boolean;
  public celular: string;
  public passo: 1 | 2 | 3 | 4;
  public codigoEnviado: { sucesso: boolean, mensagem: string } = null;

  public form = new FormGroup({
    cpf: new FormControl(''),
    nascimento: new FormControl(''),
  });

  public formCodigo = new FormGroup({
    codigo: new FormControl('')
  });

  public formSenha = new FormGroup({
    senha: new FormControl(''),
    confSenha: new FormControl('')
  });

  constructor(public autenticacaoService: AutenticacaoService,
    public localStorage: LocalStorageService,
    public sessionStorage: SessionStorageService,
    public router: Router,
    public formatterService: FormatterService) {
    this.passo = 1;
  }

  async gerarSms() {
    const valorForm = this.form.value;
    const obj = {
      cpf: valorForm.cpf.replace(new RegExp(/[.\-]/, 'g'), ''),
      dataNascimento: moment(valorForm.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
    };
    this.loading = true;
    await this.autenticacaoService.gerarSms(obj).then(response => {
      if (response.sucesso) {
        this.mensagemEnviada = true;
        this.celular = response.objeto;
        this.msgErro = null;
        this.sessionStorage.setJson('auth/dados-recuperar-senha', obj);
        this.passo = 2;
      } else {
        this.msgErro = response.mensagens[0];
      }
    }).catch(err => {
      this.msgErro = 'Sistema indisponível no momento.';
    });
    this.loading = false;
  }

  async reEnviarSms() {
    const obj = this.sessionStorage.getJson('auth/dados-recuperar-senha');
    this.loading = true;
    await this.autenticacaoService.gerarSms(obj).then(response => {
      this.mensagemEnviada = false;
      this.msgErro = '';
      if (response.sucesso) {
        this.codigoEnviado = { sucesso: response.sucesso, mensagem: `Código enviado novamente para ${this.formatterService.phoneFormat(this.celular)}` };
      } else {
        this.codigoEnviado = { sucesso: response.sucesso, mensagem: `Não foi possivel enviar o código novamente!` };
      }
    }).catch(err => {
      this.msgErro = '';
      this.codigoEnviado = { sucesso: false, mensagem: 'Sistema indisponível no momento!' };
    });
    this.loading = false;
  }

  shouldDisableButton() {
    return (this.formSenha.value.senha === this.formSenha.value.confSenha) && this.formSenha.valid;
  }

  async confirmarCodigo() {
    const codigo = this.formCodigo.value.codigo;
    const dados = this.sessionStorage.getJson('auth/dados-recuperar-senha');
    const obj = {
      usuario: dados.cpf,
      codigoSMS: codigo
    };
    this.loading = true;
    await this.autenticacaoService.confirmarCodigo(obj).then(response => {
      if (response.sucesso) {
        this.msgErro = null;
        this.sessionStorage.set('auth/codigo-recuperar-senha', obj.codigoSMS);
        this.passo = 3;
      } else {
        this.codigoEnviado = null;
        this.mensagemEnviada = false;
        this.msgErro = response.mensagens[0];
      }
    }).catch(err => {
      this.codigoEnviado = null;
      this.mensagemEnviada = false;
      this.msgErro = 'Sistema indisponível no momento.';
    });
    this.loading = false;
  }


  async mudarSenha() {
    const senha = this.formSenha.value.senha;
    const obj = {
      usuario: this.sessionStorage.getJson('auth/dados-recuperar-senha').cpf,
      senha,
      codigoSMS: this.sessionStorage.get('auth/codigo-recuperar-senha')
    };
    this.loading = true;
    await this.autenticacaoService.mudarSenha(obj).then(response => {
      if (response.sucesso) {
        this.localStorage.setJson('login', response.objeto);
        this.localStorage.set('token', response.objeto.token);
        this.passo = 4;
        this.sessionStorage.removeKeyStorage('auth');
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 4000);
      } else {
        this.msgErro = response.mensagens[0];
      }
    }).catch(err => {
      this.msgErro = 'Sistema indisponível no momento.';
    });
    this.loading = false;
  }

  voltar() {
    this.router.navigateByUrl('/auth/login');
  }
}
