import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {
    private emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    private numberRegex = /^\d+(\.\d+)$/;
    private telRegex = /(^\d{10}$)|(^$)/;
    private celRegex = /(^\d{11}$)|(^$)/;
    private dddRegex = /(^\d{1,2}$)|(^$)/;
    private cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    private cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    private dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    private datetimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}\:\d{2}$/;
    private monthRegex = /^\d{2}\/\d{4}/;
    private cepRegex = /^\d{2}\.\d{3}\-\d{3}$/;
    private horaRegex = /[0-9]{2}\:[0-9]{2}$/;

    public isValidEmail(email: string): boolean {
        return this.emailRegex.test(email);
    }

    public isValidNumber(value: string): boolean {
        return this.numberRegex.test(value);
    }

    public isValidHour(value: string): boolean {
        return this.horaRegex.test(value) && moment(`1997-11-20T${value}:00`).isValid() && value !== '24:00';
    }

    public isValidDdd(value: string): boolean {
        return this.dddRegex.test(value);
    }

    public isValidTel(value: string): boolean {
        return this.telRegex.test(value);
    }

    public isValidCel(value: string): boolean {
        return this.celRegex.test(value);
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
        return this.dateRegex.test(value) && moment(value, 'DD/MM/YYYY').isValid();
    }

    public isValidDateTime(value: string): boolean {
        return this.datetimeRegex.test(value);
    }

    public isValidMonth(value: string): boolean {
        return this.monthRegex.test(value);
    }

    public isValidAge(value: string): boolean {
        const lengthAge = value.length > 2 ? false : true;

        return lengthAge;
    }

    public isValidCep(value: string): boolean {
        return this.cepRegex.test(value);
    }

    public isValidDataNascimento(value: string): boolean {
        const arrData = value.split('/');

        const dia_aniversario = parseFloat(arrData[0]);
        const mes_aniversario = parseFloat(arrData[1]);
        const ano_aniversario = parseFloat(arrData[2]);

        const d = new Date,
            ano_atual = d.getFullYear(),
            mes_atual = d.getMonth() + 1,
            dia_atual = d.getDate();

        let quantos_anos = ano_atual - ano_aniversario;

        if (mes_atual < mes_aniversario || mes_atual === mes_aniversario && dia_atual < dia_aniversario) {
            quantos_anos--;
        }

        return quantos_anos >= 0;
    }
}
