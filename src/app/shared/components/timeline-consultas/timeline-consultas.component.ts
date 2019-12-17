import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Anamnese, Consulta } from '../../interface';
import { ANAMNESE } from '../../constants/anamnese';

@Component({
    selector: 'ngx-timeline-consultas',
    templateUrl: 'timeline-consultas.component.html',
    styleUrls: ['timeline-consultas.component.scss']
})

export class TimeLineConsultasComponent implements OnInit {

    @Input() data: any[];
    @Input() consulta: Consulta[];

    constructor() { }

    ngOnInit() {

    }

    getAnamnesia(consultaAnamnese: Anamnese) {
        let _anamnese = Object.keys(consultaAnamnese);
        _anamnese = _anamnese.filter(element => {
            return consultaAnamnese[element];
        });
        const arr = ANAMNESE;
        const lista = [];
        arr.forEach(f => {
            const filhos = [];
            f.children.forEach(c => {
                if (_anamnese.indexOf(c.control) > -1) {
                    filhos.push({...c, value: consultaAnamnese[c.control]});
                }
            });
            if (filhos.length) {
                const novoObj = {
                    title: f.title,
                    children: filhos,
                };
                lista.push(novoObj);
            }
        });
        return lista;
    }
}
