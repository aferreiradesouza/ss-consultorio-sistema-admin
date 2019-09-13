import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarioService } from '../../services/calendarios.service';
import { NbIconLibraries } from '@nebular/theme';

@Component({
    selector: 'ngx-calendario-do-dia',
    templateUrl: './calendario-do-dia.component.html',
    styleUrls: ['./calendario-do-dia.component.scss']
})

export class CalendarioDoDiaComponent implements OnInit {

    public index: number;

    @Input() data: any[];
    @Input() dataSelecionada: any;

    constructor(public calendarioService: CalendarioService, iconsLibrary: NbIconLibraries) {
        iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
        iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
        iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    }

    ngOnInit() {
        this.index = this.data.map(e => e.data).indexOf(this.dataSelecionada.diaCompleta);
        console.log(this.index);
    }

    formatarData(data) {
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
        this.dataSelecionada = this.calendarioService.montarDias([this.data[this.index]])[0];
        console.log(type);
    }

}

