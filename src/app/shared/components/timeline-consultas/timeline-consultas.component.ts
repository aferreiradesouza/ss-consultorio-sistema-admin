import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Anamnese } from '../../interface';

@Component({
    selector: 'ngx-timeline-consultas',
    templateUrl: 'timeline-consultas.component.html',
    styleUrls: ['timeline-consultas.component.scss']
})

export class TimeLineConsultasComponent implements OnInit {

    @Input() data: any[];
    @Input() consultaAnamnese: Anamnese;

    constructor() { }

    ngOnInit() {

    }
}
