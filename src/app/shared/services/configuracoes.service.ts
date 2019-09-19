import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { IListagemUsuario } from '../interface';

@Injectable()
export class ConfiguracoesService {

    constructor(private ajax: AjaxService) { }

    async obterListagem() {
        const url = `${environment.urlBase}admin/usuario`;
        return await this.ajax.get<IListagemUsuario>(url);
    }
}
