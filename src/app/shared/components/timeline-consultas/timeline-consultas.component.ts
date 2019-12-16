import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'ngx-timeline-consultas',
    templateUrl: 'timeline-consultas.component.html',
    styleUrls: ['timeline-consultas.component.scss']
})

export class TimeLineConsultasComponent implements OnInit {

    @Input() data: any[];
    @Input() template: TemplateRef<any>;

    constructor() { }

    ngOnInit() { console.log(this.template); }
}
