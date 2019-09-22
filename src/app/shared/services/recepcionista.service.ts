import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { IObterConsulta } from '../interface';

@Injectable()
export class RecepcionistaService {

    constructor(private ajax: AjaxService) { }

    async obterConsultas(data: { idMedico: number, idConsultorio: number, dataInicial: string, dataFinal: string }) {
        const url = `${environment.urlBase}admin/agenda/${data.idMedico}/${data.idConsultorio}/${data.dataInicial}/${data.dataFinal}`;
        return await this.ajax.get<IObterConsulta>(url);
    }
}
