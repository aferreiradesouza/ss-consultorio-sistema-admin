import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import * as moment from 'moment';
import { CalendarioService } from '../../services/calendarios.service';
import { NbIconLibraries } from '@nebular/theme';
import { StatusConsulta, TiposAtendimento } from '../../interface';

@Component({
    selector: 'ngx-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit, OnChanges {
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
    @Input() dataSelecionadaCalendario: Date;
    @Input() statusConsultas: StatusConsulta[];
    @Input() tiposAtendimentos: TiposAtendimento[];

    @Output() dataSelecionada = new EventEmitter();
    @Output() agendarConsulta = new EventEmitter();
    @Output() alterarStatus = new EventEmitter();
    @Output() infoConsulta = new EventEmitter();

    constructor(public calendarioService: CalendarioService, iconsLibrary: NbIconLibraries) {
        this.minDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
        iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
        iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    }

    ngOnInit() {
        this.dias = this.calendarioService.montarDias(this.data);
    }

    getColorStatus(codigo: string) {
        return this.statusConsultas.filter(e => e.codigo === codigo)[0].cor;
    }

    getColorAtendimento(codigo: string) {
        return this.tiposAtendimentos.filter(e => e.codigo === codigo)[0].cor;
    }

    getNomeStatus(codigo: string) {
        return this.statusConsultas.filter(e => e.codigo === codigo)[0].nome;
    }

    getNomeAtendimento(codigo: string) {
        return this.tiposAtendimentos.filter(e => e.codigo === codigo)[0].nome;
    }

    get dataSelectCalendario() {
        return moment(this.dataSelecionadaCalendario).format('YYYY-MM-DD');
    }

    diaSemana(data) {
        return moment(data).format('YYYY-MM-DD');
    }

    ngOnChanges(changes) {
        if (changes.data && !changes.data.firstChange) {
            this.dias = this.calendarioService.montarDias(changes.data.currentValue);
        }
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
        if (!item.consulta && !item.bloqueado) {
            ret.push('livre');
        } else if (!item.consulta && item.bloqueado) {
            ret.push('bg-white');
        } else {
            ret.push('padding-top-10');
        }
        if (item.consulta && item.consulta.ehEncaixe && !item.bloqueado) { ret.push('encaixe-background'); }
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
    }

    isNumber(val) { return typeof val === 'number'; }

    selecionarData(data: any) {
        this.dataSelecionada.emit(data);
    }

    agendar(dados, dia, ehEncaixe) {
        this.agendarConsulta.emit({ ...dados, data: dia.data, ehEncaixe });
    }

    alterarStatusConsulta(data, dia) {
        this.alterarStatus.emit({ ...data, dia });
    }

    verConsulta(dados, dia) {
        this.infoConsulta.emit({ ...dados, data: dia.data });
    }

    showButtonEncaixe(dia, index, item) {
        if (dia.totalEncaixesPermitidos <= 0 || index === dia.horarios.length - 1) {
            return false;
        }
        if (item.consulta.ehEncaixe) {
            return index !== dia.horarios.length - 1 && (dia.horarios[index + 1].consulta && !dia.horarios[index + 1].consulta.ehEncaixe) || !dia.horarios[index + 1].consulta;
        } else {
            if (index + 1 >= dia.horarios.length - 1) {
                return false;
            }
            return (dia.horarios[index + 1].consulta && !dia.horarios[index + 1].consulta.ehEncaixe) || !dia.horarios[index + 1].consulta;
        }
    }

    getTimerStatus(codigo: string, dataStatus: string) {
        const validStatus = ['em_espera', 'em_atendimento'];
        if (validStatus.indexOf(codigo) === -1) {
            return '';
        }
        const tempo = moment.utc(moment(new Date()).diff(moment(dataStatus, 'YYYY-MM-DDTHH:mm:ss'))).format('HH:mm:ss');
        return ` - ${tempo}`;
    }
}

