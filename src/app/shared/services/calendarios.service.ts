import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class CalendarioService {

    public minDay = 0;
    public maxDay = 6;

    constructor() { }

    getSubtractDay(day: number) {
        return day - this.minDay;
    }

    getAddDay(day) {
        return this.maxDay - day;
    }
    criarArray(numero: number): number[] {
        return ' '.repeat(numero).split('').map((e, index) => index++);
    }

    formatarDay(day: number) {
        switch (day) {
            case 0:
                return { extenso: 'Domingo', curto: 'Dom' };
            case 1:
                return { extenso: 'Segunda-feira', curto: 'Seg' };
            case 2:
                return { extenso: 'Terça-feira', curto: 'Ter' };
            case 3:
                return { extenso: 'Quarta-feira', curto: 'Qua' };
            case 4:
                return { extenso: 'Quinta-feita', curto: 'Qui' };
            case 5:
                return { extenso: 'Sexta-feita', curto: 'Sex' };
            case 6:
                return { extenso: 'Sábado', curto: 'Sáb' };
        }
    }

    formatarMes(mes: number) {
        switch (mes) {
            case 0:
                return { extenso: 'Janeiro', curto: 'Jan' };
            case 1:
                return { extenso: 'Fevereiro', curto: 'Fev' };
            case 2:
                return { extenso: 'Março', curto: 'Mar' };
            case 3:
                return { extenso: 'Abril', curto: 'Abr' };
            case 4:
                return { extenso: 'Maio', curto: 'Mai' };
            case 5:
                return { extenso: 'Junho', curto: 'Jun' };
            case 6:
                return { extenso: 'Julho', curto: 'Jul' };
            case 7:
                return { extenso: 'Agosto', curto: 'Ago' };
            case 8:
                return { extenso: 'Setembro', curto: 'Set' };
            case 9:
                return { extenso: 'Outubro', curto: 'Out' };
            case 10:
                return { extenso: 'Novembro', curto: 'Nov' };
            case 11:
                return { extenso: 'Dezembro', curto: 'Dez' };
        }
    }

    montarDias(data) {
        console.log(data);
        return data.map((date, index) => {
            return  {
                dia: moment(date.data, 'YYYY-MM-DD').format('DD'),
                data: this.formatarDay(moment(date.data, 'YYYY-MM-DD').day()),
                diaCompleta: date.data,
                totalEncaixesPermitidos: date.totalEncaixesPermitidos,
                horarios: date.horarios
            };
        });
    }

    getIntervalDate(start, end): string[] {
        const arr = [];
        // Get "next" monday
        const tmp = start;
        if (tmp.isAfter(start, 'd')) {
            arr.push(tmp.format('YYYY-MM-DD'));
        }
        while (tmp.isBefore(end)) {
            arr.push(tmp.format('YYYY-MM-DD'));
            tmp.add(1, 'days');
        }
        return arr;
    }

    hourToDecimal(hora) {
        const horaAtual = hora;
        const arr: any[] = horaAtual.split(':');
        const dec = parseInt(((arr[1] / 6) * 10).toString(), 10);
        return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
    }

    decimalToHour(decimal) {
    let decimalTime = decimal * 60 * 60;
    const hours = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);
    const minutes = Math.floor((decimalTime / 60));
    return `${hours.toString().length === 1 ?
        `${0}${hours}` : hours}:${minutes.toString().length === 1 ? `0${minutes}` : `${minutes}`}`;
    }

    montarDados(data: any[]): any[] {
        const maxLength = Math.ceil(data.length / 5);
        let response: any[] = this.criarArray(maxLength);
        let ind = 0;
        for (let index = 0; index < maxLength; index++) {
            const repeat = index + 1 === maxLength ? data.length % 5 : 5;
            const array = [];
            for (let i = 0; i < repeat; i++) {
                array.push(data[ind]);
                ind += 1;
            }
            response[index] = array;
        }
        response = response.map(element => {
            return this.montarDias(element);
        });
        return response;
    }
}
