import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {
    private emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    private numberRegex = /^\d+(\.\d+)$/;
    private telRegex = /(^\d{8,9}$)|(^$)/;
    private dddRegex = /(^\d{1,2}$)|(^$)/;
    private cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    private cnpjRegex  = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    private dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    private datetimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}\:\d{2}$/;
    private monthRegex = /^\d{2}\/\d{4}/;

    public isValidEmail(email: string): boolean {
        return this.emailRegex.test(email);
    }

    public isValidNumber(value: string): boolean {
        return this.numberRegex.test(value);
    }

    public isValidDdd(value: string): boolean {
        return this.dddRegex.test(value);
    }

    public isValidPhone(value: string): boolean {
        return this.telRegex.test(value);
    }

    public isValidCpf(value: string): boolean {
        return this.cpfRegex.test(value);
    }

    public isValidCnpj(value: string): boolean {
        return this.cnpjRegex.test(value);
    }

    public isValidCnpjOrCpf(value: string): boolean {
        return value == null ? false : value.length === 11 || value.length === 14;
    }

    public isValidDate(value: string): boolean {
        return this.dateRegex.test(value);
    }

    public isValidDateTime(value: string): boolean {
        return this.datetimeRegex.test(value);
    }

    public isValidMonth(value: string): boolean {
        return this.monthRegex.test(value);
    }
}
