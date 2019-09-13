import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarioService } from '../../services/calendarios.service';
import { NbIconLibraries } from '@nebular/theme';

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

    @Output() dataSelecionada = new EventEmitter();

    constructor(public calendarioService: CalendarioService, iconsLibrary: NbIconLibraries) {
        this.minDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
        iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
        iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
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
        if (item.status === 'Livre') { ret.push('livre'); } else { ret.push('padding-top-10'); }
        if (item.status === 'Encaixe') { ret.push('encaixe-background'); }
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

    selecionarData(data: any) {
        this.dataSelecionada.emit(data);
    }
}

