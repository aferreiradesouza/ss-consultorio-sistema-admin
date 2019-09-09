import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ngx-timeline',
    templateUrl: 'timeline.component.html',
    styleUrls: ['timeline.component.scss']
})

export class TimeLineComponent implements OnInit {

    @Input() data: any[];

    constructor() { }

    ngOnInit() { }
}
