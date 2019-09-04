import { Component, OnInit, Input, Self, ElementRef, ViewChild, Optional, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormatterService } from '../../services/formatter.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
    selector: 'ngx-input-mask',
    templateUrl: './input-mask.component.html',
    styleUrls: ['./input-mask.component.scss']
})
export class InputMaskComponent implements OnInit, ControlValueAccessor {
    // tslint:disable-next-line: max-line-length
    public readonly validTypes = ['password', 'cep', 'text', 'email', 'number', 'month', 'date', 'datetime', 'cpf', 'cnpjcpf', 'cc', 'tel', 'cel', 'ddd', 'idade'];
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
        cel: 'Celular inválido',
        ddd: 'DDD inválido',
        idade: 'Digite uma idade válida',
        cep: 'CEP inválido'
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
            throw new Error('[ngx-input-simple] Invalid type ' + this.type);
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
        errors.email = this.type === 'email' ? !this.validator.isValidEmail(value) : false;
        errors.tel = this.type === 'tel' ? !this.validator.isValidTel(value) : false;
        errors.cel = this.type === 'cel' ? !this.validator.isValidCel(value) : false;
        errors.ddd = this.type === 'ddd' ? !this.validator.isValidDdd(value) : false;
        errors.idade = this.type === 'idade' ? !this.validator.isValidAge(value) : false;
        errors.cep = this.type === 'cep' ? !this.validator.isValidCep(value) : false;
        errors.dataNascimento = this.type === 'dataNascimento' ? !this.validator.isValidDataNascimento(value) : false;

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

    feedbackInput() {
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

    public getMask(): string {
        switch (this.type) {
            case 'month':
                return this.formatter.masks.month;
            case 'date':
                return this.formatter.masks.date;
            case 'datetime':
                return this.formatter.masks.datetime;
            case 'dataNascimento':
                return this.formatter.masks.date;
            case 'cpf':
                return this.formatter.masks.cpf;
            case 'cnpj':
                return this.formatter.masks.cnpj;
            case 'cc':
                return this.formatter.masks.cc;
            case 'number':
                return this.formatter.masks.number;
            case 'idade':
                return this.formatter.masks.number;
            case 'tel':
                return this.formatter.masks.telDDD;
            case 'cel':
                return this.formatter.masks.celDDD;
            case 'cep':
                return this.formatter.masks.cep;
            case 'percent':
                return undefined;
        }

        return undefined;
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
