import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { IInfoEndereco } from '../interface';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class UtilService {

    constructor(private ajax: AjaxService) { }

    public static EhMedico(): boolean {
        return JSON.parse(localStorage.getItem('login')).ehMedico;
    }

    public static EhAdministrador(): boolean {
        return JSON.parse(localStorage.getItem('login')).ehAdministrador;
    }

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

    public async verificarImagem(url) {
        return await this.ajax.get<any>(url).catch(err => {
            return null;
        });
    }

    formatarData(data: string, type = 'YYYY-MM-DD', target: string) {
        return moment(data, type).format(target);
    }

    clone(obj) {
      if (null == obj || 'object' !== typeof obj) return obj;
      const copy = obj.constructor();
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    }
}
