import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { IInfoEndereco } from '../interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class UtilService {

    constructor(private ajax: AjaxService) { }

    public async buscarCep(cep: string) {
        const url = `${environment.urlBase}admin/endereco/${cep}`;
        return await this.ajax.get<IInfoEndereco>(url);
    }
}
