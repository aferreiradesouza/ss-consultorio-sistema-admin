import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../services/formatter.service';
import { StatusAtendimentoEnum } from './../enums/status-atendimento.enum';

@Pipe({
    name: 'status'
})

export class StatusAtendimentoPipe implements PipeTransform {
    constructor(public formatterService: FormatterService) {

    }
    transform(value: any, ...args: any[]): any {
        if (!value) {
            return value;
        }
        return StatusAtendimentoEnum.obterDescricao(value);
    }
}
