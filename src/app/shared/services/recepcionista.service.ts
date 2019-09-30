import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { IObterConsulta, IListagemUsuario, IListagemConsultorios, ICriarBloqueio } from '../interface';

@Injectable()
export class RecepcionistaService {

    constructor(private ajax: AjaxService) { }

    async obterConsultas(data: { idMedico: number, idConsultorio: number, dataInicial: string, dataFinal: string }) {
        const url = `${environment.urlBase}admin/agenda/${data.idMedico}/${data.idConsultorio}/${data.dataInicial}/${data.dataFinal}`;
        return await this.ajax.get<IObterConsulta>(url);
    }

    async obterMedicos() {
        const url = `${environment.urlBase}admin/usuario`;
        const response = await this.ajax.get<IListagemUsuario>(url);
        if (response.sucesso) {
            return { sucesso: response.sucesso, resultado: response.objeto.filter(m => m.ehMedico), error: null };
        } else {
            return { sucesso: response.sucesso, resultado: null, error: response.mensagens[0] };
        }
    }

    async obterConsultorios(idMedico: number) {
        const url = `${environment.urlBase}admin/usuario/${idMedico}/consultorios`;
        const response = await this.ajax.get<IListagemConsultorios>(url);
        if (response.sucesso) {
            const filtrado = this.getUnique(response.objeto, 'nome');
            return { sucesso: response.sucesso, resultado: filtrado, error: null };
        } else {
            return { sucesso: response.sucesso, resultado: null, error: response.mensagens[0] };
        }
    }

    getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

    async criarBloqueio(data) {
        const url = `${environment.urlBase}admin/agenda/criarBloqueio`;
        return await this.ajax.post<ICriarBloqueio>(url, data);
    }
}
