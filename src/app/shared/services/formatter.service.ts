import { Injectable } from '@angular/core';
import * as Moment from 'moment';
import 'moment/locale/pt-br';


@Injectable({
    providedIn: 'root'
})
export class FormatterService {
    public readonly MONTH_FORMAT = 'MM/YYYY';
    public readonly DATE_FORMAT = 'DD/MM/YYYY';
    public readonly DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';
    public readonly regexpObj = /\{([\w\:\.]+|)\}/g;
    public readonly phoneRegex = /^(\d{3})(\d{4,5})(\d{3,4})$/;

    // Masks for ngx-mask package
    public readonly masks = {
        'month': '00/0000',
        'date': '00/00/0000',
        'datetime': '00/00/0000 00:00',
        'currency': '9*.?99',
        'cpf': '000.000.000-00',
        'cnpj': '00.000.000/0000-00',
        'cnpjcpf': ['000.000.000-00', '00.000.000/0000-00'],
        'cc': '0000000000-0'
    };

    constructor() { }

    public isUndefined(value) {
        return typeof value === 'undefined';
    }

    public format(str: string, obj: object) {
        return str.replace(this.regexpObj, (a, b) => {
            b = b.split('.');
            let value = obj[b.shift()];

            while (b.length) {
                if (this.isUndefined(value)) {
                    break;
                }
                value = value[b.shift()];
            }

            return this.isUndefined(value) ? a : value;
        });
    }

    public currency(value: number | string, prefix: string = 'R$'): string {
        value = value || 0;
        const v = parseFloat(value.toString()).toFixed(2);
        const r = v.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        return `${prefix} ${r}`;
    }

    public date(value: string): string {
        if (value === '') {
            return '';
        }
        const moment = Moment(value);
        if (!moment.isValid()) {
            throw new Error(`Invalid date format ${value}`);
        }
        return moment.format(this.DATE_FORMAT);
    }

    public datetime(value: Date | string): string {
        const moment = Moment(value);
        if (!moment.isValid()) {
            throw new Error(`Invalid datetime format ${value}`);
        }
        return moment.format(this.DATETIME_FORMAT);
    }

    public cpfCnpj(value: string): string {
        if (value.length === 11) {
            return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9, 11)}`;
        } else if (value.length === 14) {
            // tslint:disable-next-line max-line-length
            return `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}/${value.substring(8, 12)}-${value.substring(12, 14)}`;
        } else {
            console.error(`[formatter.cpfCnpj] Invalid length ${value.length}`);
            return value;
        }
    }

    public monthYear(value: Date | string): string {
        if (value === '') {
            return '';
        }

        if (value instanceof Date) {
            return Moment(value).format(this.MONTH_FORMAT);
        }

        // format from native month picker: YYYY-MM
        if (/^\d{4}\-\d{2}$/.test(value)) {
            return Moment(value, 'YYYY-MM').format(this.MONTH_FORMAT);
        }

        // our format: MM/YYYY
        if (/^\d{2}\/\d{4}$/.test(value)) {
            return value;
        }

        // search-form format: MMYYYY
        if (/^\d{6}$/.test(value)) {
            return Moment(value, 'MMYYYY').format(this.MONTH_FORMAT);
        }

        console.error(`[formatter.monthYear] Unknown date format: ${value}`);
        return '';
    }

    public phoneFormat(value: string) {
        value = (value || '').toString().trim();

        if (value === '') {
            return '';
        }

        const result = this.phoneRegex.exec(value);
        if (!result) {
            console.warn(`[formatter.phoneFormat] Invalid value ${value}`);
            return value;
        }

        return `(${result[1]}) ${result[2]}-${result[3]}`;
    }

    public get(obj: object, path: string): string {
        const index = path.split('.');
        let value = obj || {};

        let i: number;
        for (i = 0; i < index.length; i++) {
            value = value[index[i]];

            if (value === null || typeof value !== 'object') {
                break;
            }
        }

        if (index.length - 1 === i) {
            return (value || '').toString();
        } else {
            return undefined;
        }
    }

}
