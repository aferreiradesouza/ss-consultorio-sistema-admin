import { Component, OnInit, Input, Self, ElementRef, ViewChild, Optional, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { FormatterService } from '../../services/formatter.service';
import { ValidatorService } from '../../services/validator.service';
import { NbInputDirective } from '@nebular/theme';

@Component({
    selector: 'ngx-text-area-simple',
    templateUrl: './text-area-simple.component.html',
    styleUrls: ['./text-area-simple.component.scss']
})
export class TextAreaSimpleComponent implements OnInit, ControlValueAccessor {
    // tslint:disable-next-line: max-line-length
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    public messages = {
        required: 'Campo obrigatório',
    };

    @Input() label?: string;
    @Input() disabled: boolean = false;
    @Input() type = 'text';
    @Input() name: string;
    @Input() placeholder: string = '';
    @Input() required: boolean = false;
    @Input() maxLength: number = 0;
    @Input() feedback: boolean = true;

    @Output() blur = new EventEmitter();

    @ViewChild(NbInputDirective, {static: false}) nbInput: NbInputDirective;

    public _model = new FormControl();

    constructor(
        @Optional() @Self() private controlDir: NgControl,
        private formatter: FormatterService,
        private validator: ValidatorService,
    ) {
        controlDir.valueAccessor = this;
    }

    public get control() {
        return this.controlDir.control;
    }


    ngOnInit() {

        const control = this.controlDir.control;
        this._model.clearValidators();
        this._model.updateValueAndValidity();
        this.validate(this._model.value);
        this._model.valueChanges.subscribe(e => {
            this.onChange(e);
        });
    }

    writeValue(value: string) {
        this._model.setValue(value);
        this._model.markAsDirty();
    }

    registerOnChange(fn: (value: string) => void) {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    onBlur(value: string) {

        this.onTouched();
        this.validate(value);
        this.blur.emit();
    }


    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    public onChange(value: string): void {
        this.onChangeFn(value);
        this.validate(value);
    }

    public validate(value: string) {
        const errors: any = {};
        errors.required = this.required ? value === '' : false;

        if (this.maxLength !== 0 && typeof this.maxLength === 'number') {
            errors.maxLength = (value.length > this.maxLength);
        }
        const hasError = Object.keys(errors).some(key => errors[key]);
        this._model.setErrors(hasError ? errors : null);
    }

    public getType(): string {
        if (['password'].includes(this.type)) {
            return this.type;
        }

        return 'text';
    }

    public shouldDisplayError(): boolean {
        const control = this.controlDir.control;
        return (this._model.invalid && this._model.touched);
    }

    public getErrorMessage(): string {
        if (!this.shouldDisplayError()) {
            return '';
        }

        const key = Object.keys(this.control.errors).find(k => this._model.errors[k]);

        return key ? this.messages[key] : '';
    }

}
