import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { CalendarioService } from '../../services/calendarios.service';
import { NbIconLibraries } from '@nebular/theme';
import { StatusConsulta, TiposAtendimento } from '../../interface';

@Component({
    selector: 'ngx-calendario-do-dia',
    templateUrl: './calendario-do-dia.component.html',
    styleUrls: ['./calendario-do-dia.component.scss']
})

export class CalendarioDoDiaComponent implements OnInit, OnChanges {

    public index: number;
    public dataExtenso: string;
    public info: any;

    @Input() data: any[];
    @Input() dataSelecionada: any;
    @Input() verDiasLivre = true;
    @Input() showHeader = true;
    @Input() statusConsultas: StatusConsulta[];
    @Input() tiposAtendimentos: TiposAtendimento[];

    @Output() alterarStatus = new EventEmitter();
    @Output() marcarConsulta = new EventEmitter();
    @Output() infoConsulta = new EventEmitter();
    @Output() iniciarAtendimento = new EventEmitter();

    constructor(public calendarioService: CalendarioService, iconsLibrary: NbIconLibraries) {
        iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
        iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
        iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    }

    ngOnChanges(change) {
        if (change.data) {
            this.info = this.calendarioService.montarDias([change.data.currentValue])[0];
            this.dataExtenso = this.formatarData;
        }
    }

    ngOnInit() {
        this.info = this.calendarioService.montarDias([this.data])[0];
        this.dataExtenso = this.formatarData;
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

    get formatarData() {
        const data = this.info;
        const dia = data.diaCompleta;
        return `${data.dia}
                de ${this.calendarioService.formatarMes(moment(dia).month()).extenso}
                de ${moment(dia).format('YYYY')},
                ${data.data.extenso}`;
    }

    changeDia(type: string) {
        if (type === 'proximo') {
            if (this.index + 1 > this.data.length - 1) {
                return;
            }
            this.index += 1;
        } else if (type === 'anterior') {
            if (this.index - 1 < 0) {
                return;
            }
            this.index -= 1;
        }
        this.info = this.calendarioService.montarDias([this.data[this.index]])[0];
        this.dataExtenso = this.formatarData;
    }

    getDatas(data) {
        return data.filter(e => {
            if (!e.consulta) {
                return this.verDiasLivre;
            }
            return true;
        });
    }

    alterarStatusConsulta(data) {
        this.alterarStatus.emit(data);
    }

    agendarConsulta(dados, dia, ehEncaixe) {
        this.marcarConsulta.emit({...dados, data: dia.diaCompleta, ehEncaixe});
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

    verConsulta(dados, dia) {
        this.infoConsulta.emit({ ...dados, data: dia.diaCompleta });
    }

    getTimerStatus(codigo: string, dataStatus: string) {
        const validStatus = ['em_espera', 'em_atendimento'];
        if (validStatus.indexOf(codigo) === -1) {
            return '';
        }
        const tempo = moment.utc(moment(new Date()).diff(moment(dataStatus, 'YYYY-MM-DDTHH:mm:ss'))).format('HH:mm:ss');
        return ` - ${tempo}`;
    }

    getCountConsultas() {
        const count = this.getDatas(this.info.horarios).filter(e => e.consulta).length;
        if (count === 0) {
            return {mensagem: ``, count};
        } else {
            return {mensagem: `${count} consulta${count > 1 ? 's' : ''} marcada${count > 1 ? 's' : ''}`, count};
        }
    }

    iniciarAtendimentoEvent(id: string | number) {
        this.iniciarAtendimento.emit(id);
    }
}

