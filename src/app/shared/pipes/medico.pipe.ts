import { Pipe, PipeTransform } from '@angular/core';
import { MedicoEnum } from './../enums/medico.enum';

@Pipe({
    name: 'medico'
})

export class MedicoPipe implements PipeTransform {
    transform(value: any, ...formats: any[]): any {
        if (!value) {
            return value;
        }
        if (typeof value === 'string') { value = parseInt(value, 10); }
        return MedicoEnum.obterDescricao(value);
    }
}
