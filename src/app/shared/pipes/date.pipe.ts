import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'date'
})

export class DatePipe implements PipeTransform {
    transform(value: any, ...formats: any[]): any {
        if (!value) {
            return '-';
        }
        return moment(value, formats[0]).format('DD/MM/YYYY');
    }
}
