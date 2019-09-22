import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { IListagemUsuario, IInfoUsuario, Usuario, IAlterarUsuario } from '../interface';

@Injectable()
export class ConfiguracoesService {

    constructor(private ajax: AjaxService) { }

    async obterListagemUsuarios() {
        const url = `${environment.urlBase}admin/usuario`;
        return await this.ajax.get<IListagemUsuario>(url);
    }

    async obterInfoUsuario(id: number) {
        const url = `${environment.urlBase}admin/usuario/${id}`;
        return await this.ajax.get<IInfoUsuario>(url);
    }

    async alterarUsuario(data) {
        const url = `${environment.urlBase}admin/usuario/alterarPerfil`;
        return await this.ajax.post<IAlterarUsuario>(url, data);
    }
}
