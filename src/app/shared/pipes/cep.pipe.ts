import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../services/formatter.service';

@Pipe({
    name: 'cep'
})

export class CepPipe implements PipeTransform {

    constructor(public formatter: FormatterService) {}

    transform(value: any, ...args: any[]): any {
        if (!value) { return value; }
        return this.formatter.cepFormat(value);
    }
}
