import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ngx-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.scss']
})

export class ItemComponent implements OnInit {

    @Input() label: string;
    @Input() value?: any;

    constructor() { }

    ngOnInit() {

    }
}
