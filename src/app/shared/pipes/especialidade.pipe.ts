import { Pipe, PipeTransform } from '@angular/core';
import { EspecialidadeEnum } from './../enums/especialidade.enum';

@Pipe({
    name: 'especialidade'
})

export class EspecialidadePipe implements PipeTransform {
    transform(value: any, ...formats: any[]): any {
        if (!value) {
            return value;
        }
        if (typeof value === 'string') { value = parseInt(value, 10); }
        return EspecialidadeEnum.obterDescricao(value);
    }
}
