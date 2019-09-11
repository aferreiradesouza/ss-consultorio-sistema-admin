import { Pipe, PipeTransform } from '@angular/core';
import { LugarEnum } from '../enums/lugar.enum';

@Pipe({
    name: 'lugar'
})

export class LugarPipe implements PipeTransform {
    transform(value: any, ...formats: any[]): any {
        if (!value) {
            return value;
        }
        if (typeof value === 'string') { value = parseInt(value, 10); }
        return LugarEnum.obterDescricao(value);
    }
}
