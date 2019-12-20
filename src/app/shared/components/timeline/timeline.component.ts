import { Component, OnInit, Input } from '@angular/core';
import { TiposAtendimento, StatusConsulta, Consulta } from '../../interface';

@Component({
    selector: 'ngx-timeline',
    templateUrl: 'timeline.component.html',
    styleUrls: ['timeline.component.scss']
})

export class TimeLineComponent implements OnInit {

    @Input() data: Consulta[];
    @Input() tiposAtendimentos: TiposAtendimento[];
    @Input() statusConsultas: StatusConsulta[];

    constructor() { }

    ngOnInit() { }

    getColorAtendimento(codigo: string) {
        return this.statusConsultas.filter(e => e.codigo === codigo)[0].cor;
    }

    getNomeStatus(codigo: string) {
        return this.statusConsultas.filter(e => e.codigo === codigo)[0].nome;
    }
}
