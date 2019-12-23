import { Component, OnInit, Optional, Self, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CAMPOS } from '../../constants/campos-documento';

@Component({
    selector: 'ngx-editor',
    templateUrl: 'editor.component.html'
})

export class EditorComponent implements OnInit, ControlValueAccessor {
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;
    public camposDinamicos = CAMPOS;
    public editorData: any;

    ckeConfig: any;
    @ViewChild('myckeditor', { static: false }) ckeditor: any;

    @Input() showButtons = true;

    @Output() blur = new EventEmitter();
    @Output() required: boolean;

    constructor(
        @Optional() @Self() private controlDir: NgControl) {
        controlDir.valueAccessor = this;
    }

    public get control() {
        return this.controlDir.control;
    }

    ngOnInit() {
        this.ckeConfig = {
            allowedContent: false,
            extraPlugins: 'divarea',
            forcePasteAsPlainText: true
        };
    }

    writeValue(value: string) {
    }

    registerOnChange(fn: (value: string) => void) {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    onBlur(value: string) {
        this.onTouched();
        this.blur.emit();
    }

    public onChange(value: string): void {
        this.onChangeFn(value);
    }

    adicionarTexto(texto: string) {
        this.ckeditor.instance.insertHtml(texto);
    }

    removerTexto() {
        this.ckeditor.instance.setData('');
    }

    public validate(value: string) {
        const errors: any = {};
        errors.required = this.required ? value === '' : false;

        const hasError = Object.keys(errors).some(key => errors[key]);
        if (this.required) {
            this.controlDir.control.setErrors(hasError ? errors : null);
        } else {
            if (value) {
                this.controlDir.control.setErrors(hasError ? errors : null);
            }
        }
    }
}
