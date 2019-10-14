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

    public getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

    public async loading(timer: number, execute: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(execute());
            }, timer);
        });
    }
}
