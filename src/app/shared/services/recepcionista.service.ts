import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { IObterConsulta, IListagemUsuario, IListagemConsultoriosUsuario, ICriarBloqueio, IStatusConsulta, ITiposAtendimento, IAlterarStatus, ICriarConsulta, IObterEspecialidades, IObterInfoConsulta, IAlterarConsulta, IAlterarBloqueio } from '../interface';
import { UtilService } from './util.service';

@Injectable()
export class RecepcionistaService {

    constructor(private ajax: AjaxService, private utilService: UtilService) { }

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
        const response = await this.ajax.get<IListagemConsultoriosUsuario>(url);
        if (response.sucesso) {
            const filtrado = this.utilService.getUnique(response.objeto, 'nome');
            return { sucesso: response.sucesso, resultado: filtrado, error: null };
        } else {
            return { sucesso: response.sucesso, resultado: null, error: response.mensagens[0] };
        }
    }

    async criarBloqueio(data) {
        const url = `${environment.urlBase}admin/agenda/criarBloqueio`;
        return await this.ajax.post<ICriarBloqueio>(url, data);
    }

    async alterarBloqueio(data) {
        const url = `${environment.urlBase}admin/agenda/alterarBloqueio`;
        return await this.ajax.post<IAlterarBloqueio>(url, data);
    }

    async obterStatusConsulta() {
        const url = `${environment.urlBase}admin/agenda/obterStatusConsultas`;
        return await this.ajax.get<IStatusConsulta>(url);
    }

    async obterTiposAtendimento() {
        const url = `${environment.urlBase}admin/agenda/obterTiposConsultas`;
        return await this.ajax.get<ITiposAtendimento>(url);
    }

    async alterarStatus(data) {
        const url = `${environment.urlBase}admin/agenda/alterarStatusConsulta`;
        return await this.ajax.post<IAlterarStatus>(url, data);
    }

    async criarConsulta(data) {
        const url = `${environment.urlBase}admin/agenda/criarConsulta`;
        return await this.ajax.post<ICriarConsulta>(url, data);
    }

    async obterEspecialidades(id: number) {
        const url = `${environment.urlBase}admin/usuario/${id}/especialidades`;
        return await this.ajax.get<IObterEspecialidades>(url);
    }

    async obterConsultaId(id: number) {
        const url = `${environment.urlBase}admin/agenda/obterConsulta/${id}`;
        return await this.ajax.get<IObterInfoConsulta>(url);
    }

    async alterarConsulta(data) {
        const url = `${environment.urlBase}admin/agenda/alterarConsulta`;
        return await this.ajax.post<IAlterarConsulta>(url, data);
    }
}
