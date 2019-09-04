import { Component, OnInit, Input, Self, ElementRef, ViewChild, Optional, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { FormatterService } from '../../services/formatter.service';
import { ValidatorService } from '../../services/validator.service';
import { NbInputDirective } from '@nebular/theme';

@Component({
    selector: 'ngx-input-simple',
    templateUrl: './input-simple.component.html',
    styleUrls: ['./input-simple.component.scss']
})
export class InputSimpleComponent implements OnInit, ControlValueAccessor {
    // tslint:disable-next-line: max-line-length
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
        ddd: 'DDD inválido',
    };

    @Input() label?: string;
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
        if (this.validTypes.indexOf(this.type) === -1) {
            throw new Error('[ngx-input] Invalid type ' + this.type);
        }

        const control = this.controlDir.control;
        this._model.clearValidators();
        this._model.updateValueAndValidity();
        this.validate(this._model.value);
        this.shouldDisabled();
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
        this.feedbackInput();
    }

    public onChange(value: string): void {
        this.onChangeFn(value);
        this.validate(value);
        this.feedbackInput();
    }

    shouldDisabled() {
        if (this.control.disabled) {
            this._model.disable();
        }
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
        errors.tel = this.type === 'tel' ? !this.validator.isValidTel(value) : false;
        errors.ddd = this.type === 'ddd' ? !this.validator.isValidDdd(value) : false;

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

    feedbackInput() {
        if (!this.feedback) {
            this.nbInput.status = null;
        } else {
            if (this._model.dirty && !this._model.touched) {
                if (this.shouldDisplayError() || this._model.invalid) {
                    this.nbInput.status = 'danger';
                } else {
                    this.nbInput.status = 'success';
                }
            } else {
                if (!this._model.dirty && !this._model.touched) {
                    this.nbInput.status = undefined;
                } else if (this.shouldDisplayError()) {
                    this.nbInput.status = 'danger';
                } else {
                    if (this._model.invalid) {
                        this.nbInput.status = 'danger';
                    }
                    this.nbInput.status = 'success';
                }
            }
        }
    }

    public getErrorMessage(): string {
        if (!this.shouldDisplayError()) {
            return '';
        }

        const key = Object.keys(this.control.errors).find(k => this._model.errors[k]);

        if (key === 'maxLength') {
            return this.messages.maxLength.replace('X', this.maxLength.toString());
        }

        return key ? this.messages[key] : '';
    }

}
