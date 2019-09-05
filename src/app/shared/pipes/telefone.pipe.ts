import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../services/formatter.service';

@Pipe({
    name: 'telefone'
})

export class TelefonePipe implements PipeTransform {
    constructor(public formatterService: FormatterService) {

    }
    transform(value: any, ...args: any[]): any {
        if (!value) {
            return value;
        }
        return this.formatterService.phoneFormat(value);
    }
}
