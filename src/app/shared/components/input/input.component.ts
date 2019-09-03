import { Component, OnInit, Input, Self, ElementRef, ViewChild, Optional, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormatterService } from '../../services/formatter.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
    selector: 'ngx-input',
    templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, ControlValueAccessor {
    public readonly validTypes = ['password', 'text', 'email', 'number', 'month', 'date', 'datetime', 'cpf', 'cnpjcpf', 'cc', 'tel', 'ddd'];
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    public messages = {
        required: 'Campo obrigatório',
        cpf: 'CPF inválido',
        cnpj: 'CNPJ inválido',
        cnpjcpf: 'CPF ou CNPJ inválido',
        date: 'Data inválida',
        datetime: 'Data inválida',
        month: 'Data inválida',
        number: 'Valor inválido',
        email: 'Email inválido',
        maxLength: 'Máximo de X caracteres',
        tel: 'Telefone inválido',
        ddd: 'DDD inválido'
    };

    @Input() label?: string;
    @Input() disabled: boolean = false;
    @Input() type = 'text';
    @Input() name: string;
    @Input() placeholder: string = '';
    @Input() required: boolean = false;
    @Input() maxLength: number = 0;

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
        if (this.validTypes.indexOf(this.type) === -1) {
            throw new Error('[ss-input] Invalid type ' + this.type);
        }

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
        console.log(this.getErrorMessage())
        this.validate(value);

    }

    public validate(value: string) {
        const errors: any = {};
        errors.required = this.required ? value === '' : false;
        errors.cpf = this.type === 'cpf' ? !this.validator.isValidCpf(value) : false;
        errors.cnpj = this.type === 'cnpj' ? !this.validator.isValidCnpj(value) : false;
        errors.cnpjcpf = this.type === 'cnpjcpf' ? !this.validator.isValidCnpjOrCpf(value) : false;
        errors.date = this.type === 'date' ? !this.validator.isValidDate(value) : false;
        errors.datetime = this.type === 'datetime' ? !this.validator.isValidDateTime(value) : false;
        errors.month = this.type === 'month' ? !this.validator.isValidMonth(value) : false;
        errors.number = this.type === 'number' ? !this.validator.isValidNumber(value) : false;
        errors.email = this.type === 'email' ? !this.validator.isValidEmail(value) : false;
        errors.tel = this.type === 'tel' ? !this.validator.isValidPhone(value) : false;
        errors.ddd = this.type === 'ddd' ? !this.validator.isValidDdd(value) : false;

        if (this.maxLength !== 0 && typeof this.maxLength === 'number') {
            errors.maxLength = (value.length > this.maxLength);
        }
        const hasError = Object.keys(errors).some(key => errors[key]);
        this.controlDir.control.setErrors(hasError ? errors : null);
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

    public getErrorMessage(): string {
        if (!this.shouldDisplayError()) {
            return '';
        }

        const key = Object.keys(this.control.errors).find(k => this.control.errors[k]);

        if (key === 'maxLength') {
            return this.messages.maxLength.replace('X', this.maxLength.toString());
        }

        return key ? this.messages[key] : '';
    }

}
