import { Pipe, PipeTransform } from '@angular/core';
import { VisaoEnum } from './../enums/visao.enum';

@Pipe({
    name: 'visao'
})

export class VisaoPipe implements PipeTransform {
    transform(value: any, ...formats: any[]): any {
        if (!value) {
            return value;
        }
        if (typeof value === 'string') { value = parseInt(value, 10); }
        return VisaoEnum.obterDescricao(value);
    }
}
