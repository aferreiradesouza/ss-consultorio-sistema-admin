import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { ILogar, IVerificarToken } from '../interface';

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
}
