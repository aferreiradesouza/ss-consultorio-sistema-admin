import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { ILogar, IVerificarToken, IGerarSms, IConfirmarCodigo, IMudarSenha } from '../interface';

@Injectable()
export class AutenticacaoService {

    constructor(public ajax: AjaxService) { }

    async login(data) {
        const url = `${environment.urlBase}admin/autenticacao/efetuarLogin`;
        return await this.ajax.post<ILogar>(url, data);
    }

    async verificarToken() {
        const url = `${environment.urlBase}admin/autenticacao/verificarToken`;
        return await this.ajax.get<IVerificarToken>(url);
    }

    async gerarSms(data) {
        const url = `${environment.urlBase}admin/autenticacao/gerarCodigoSMS`;
        return await this.ajax.post<IGerarSms>(url, data);
    }

    async confirmarCodigo(data) {
        const url = `${environment.urlBase}admin/autenticacao/confirmarCodigoEsqueciSenha`;
        return await this.ajax.post<IConfirmarCodigo>(url, data);
    }

    async mudarSenha(data) {
        const url = `${environment.urlBase}admin/autenticacao/alterarSenhaEsqueciSenha`;
        return await this.ajax.post<IMudarSenha>(url, data);
    }

}
