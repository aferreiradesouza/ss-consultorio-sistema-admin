import { Component, OnInit, Input, Self, ElementRef, ViewChild, Optional, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormatterService } from '../../services/formatter.service';
import { ValidatorService } from '../../services/validator.service';
import { NbButtonComponent } from '@nebular/theme';

@Component({
    selector: 'ngx-input-currency',
    templateUrl: './input-currency.component.html',
    styleUrls: ['./input-currency.component.scss']
})
export class InputCurrencyComponent implements OnInit, ControlValueAccessor {
    // tslint:disable-next-line: max-line-length
    public readonly validTypes = ['currency'];
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    public messages = {
        currency: 'Formato de dinheiro inválido'
    };

    @Input() label?: string;
    @Input() disabled: boolean = false;
    @Input() type = 'text';
    @Input() name: string;
    @Input() placeholder: string = '';
    @Input() required: boolean = false;
    @Input() maxLength: number = 0;
    @Input() dropCharacters = true;
    @Input() feedback = true;
    @Input() autocomplete = true;

    @Output() blur = new EventEmitter();
    public _model = '';

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
        control.clearValidators();
        control.updateValueAndValidity();
        this.validate(control.value);
    }

    writeValue(value: string) {
        this._model = value;
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
        if (this.required) {
            this.controlDir.control.setErrors(hasError ? errors : null);
        } else {
            if (value) {
                this.controlDir.control.setErrors(hasError ? errors : null);
            }
        }
    }

    public getType(): string {
        if (['password'].includes(this.type)) {
            return this.type;
        }

        return 'text';
    }

    public shouldDisplayError(): boolean {
        const control = this.controlDir.control;
        return (control.invalid && control.touched);
    }

    feedbackInput() {
        if (!this.feedback) {
            return undefined;
        }
        const control = this.controlDir.control;
        if (!control.dirty && !control.touched) {
            if (this.shouldDisplayError()) {
                return 'danger';
            } else if (!control.dirty && !control.touched) {
                return null;
            } else {
                return 'success';
            }
        } else if (this.shouldDisplayError() || this.control.invalid) {
            return 'danger';
        } else {
            if (control.invalid) {
                return 'danger';
            }
            return 'success';
        }
    }

    public getErrorMessage(): string {
        if (!this.shouldDisplayError() || !this.feedback) {
            return '';
        }

        const key = Object.keys(this.control.errors).find(k => this.control.errors[k]);

        return key ? this.messages[key] : '';
    }

}
