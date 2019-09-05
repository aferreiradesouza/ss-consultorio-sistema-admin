import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../services/formatter.service';

@Pipe({
    name: 'cpf'
})

export class CpfPipe implements PipeTransform {

    public constructor(public formatter: FormatterService) {}

    transform(value:  string, args?: any): any {
        if (value && value.length > 14) {
            return value;
        }
        return this.formatter.cpfCnpj(value);
    }
}
