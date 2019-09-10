import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { CalendarioService } from '../../services/calendarios.service';

@Component({
    selector: 'ngx-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit {
    public dataAtual = moment();
    public dataAtualFormatada = moment().format('YYYY-MM-DD');
    public posicaoPaleta;
    public dias;
    public maxAgendamentos: number;
    public dataCalendario: any;
    public minDate: any;
    public semana: number[];
    public index: number = 0;
    public dados: any[];

    @Input() data: any[];

    constructor(public calendarioService: CalendarioService) {
        this.minDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    }

    ngOnInit() {
        this.dias = this.calendarioService.montarDias(this.data);
        this.dados = this.calendarioService.montarDados(this.data);
        console.log(this.dados);
        this.semana = this.calendarioService.criarArray(5);
    }

    obterArray(num) {
        return this.calendarioService.criarArray(num);
    }

    obterHoras() {
        const horasLength = 48;
        const horarios = this.calendarioService.criarArray(horasLength);
        return horarios;
    }

    obterClassesAgendamento(item) {
        if (typeof item === 'number') { return ['disabled']; }
        const ret = [];
        if (item.status === 'Livre') { ret.push('livre'); }
        return ret;
    }

    changeMes(type: string): void {
        if (type === 'proximo') {
            if (this.index + 1 > this.dados.length - 1) {
                return;
            }
            this.index += 1;
        } else if (type === 'anterior') {
            if (this.index - 1 < 0) {
                return;
            }
            this.index -= 1;
        }
        console.log(type);
    }

    isNumber(val) { return typeof val === 'number'; }
}

