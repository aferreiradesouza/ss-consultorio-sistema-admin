import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'ngx-collapsible',
    templateUrl: './collapsible.component.html',
    styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent implements OnInit {
    public currentHeight?: number;
    public isOpen: boolean;

    @Input() displayLabel: boolean = true;
    @Input() labelOpen?: string = 'Ver mais';
    @Input() labelClose?: string = 'Fechar';
    @Input() defaultStyle?: boolean = false;
    @Input() showIcon?: boolean = true;
    @Input() disableIcon: boolean;

    @Output() openPage = new EventEmitter();

    @ViewChild('content', {static: false}) content: ElementRef<HTMLDivElement>;

    constructor() { }

    ngOnInit() {
    }

    public toggle() {
        // if (!this.disableIcon) {
        //     this.openPage.emit('123');
        //     return;
        // }
        this.isOpen ? this.close() : this.open();
    }

    public updateHeight() {
        const content: HTMLDivElement = this.content.nativeElement;

        content.style.maxHeight = `${content.scrollHeight}px`;
        this.currentHeight = content.scrollHeight;
    }

    public close() {
        console.log('close');
        const content: HTMLDivElement = this.content.nativeElement;
        content.style.maxHeight = '0px';
        this.isOpen = false;
    }

    public open() {
        console.log('open');
        this.isOpen = true;
        this.updateHeight();
    }
}
