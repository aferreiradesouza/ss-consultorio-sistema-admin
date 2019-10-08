import { Component, OnInit, Input, Self, Optional, ViewChild, Output, EventEmitter } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { ListagemPacientes } from '../../interface';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'ngx-input-autocomplete',
    templateUrl: 'input-autocomplete.component.html',
    styleUrls: ['input-autocomplete.component.scss']
})

export class AutoCompleteComponent implements OnInit, ControlValueAccessor {
    public _model = '';
    public lista = ['Arthur', 'Rafael', 'Nada', 'Nadica de nada', 'hehe'];
    public profile: any;
    public listaFiltrada: ListagemPacientes[] = [];
    public showProfile = false;
    public showList = false;
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    @Input() label: string;
    @Input() required: boolean;
    @Input() placeholder: string;
    @Input() pacientes: ListagemPacientes[];

    @Output() blur = new EventEmitter();
    @Output() adicionar = new EventEmitter();
    @Output() selectItem = new EventEmitter();

    constructor(
        @Optional() @Self() private controlDir: NgControl) {
        controlDir.valueAccessor = this;
    }

    public get control() {
        return this.controlDir.control;
    }

    ngOnInit() {
        const control = this.controlDir.control;
        control.clearValidators();
        control.updateValueAndValidity();
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

    public onChange(value): void {
        this.onChangeFn(value);
        this.filtrar(value);
    }


    mouseEnterData(evento: MouseEvent, data) {
        this.showProfile = true;
        this.profile = data;
    }

    mouseLeaveData(evento: MouseEvent) {
        this.showProfile = false;
    }

    mouseEnterProfile() {
        this.showProfile = true;
    }

    mouseLeaveProfile() {
        this.showProfile = false;
    }

    filtrar(valor: string) {
        if (!valor) {
            this.listaFiltrada = [];
            this.profile = null;
            this.showProfile = false;
            this.showList = false;
            return;
        }
        this.showList = true;
        this.listaFiltrada = this.pacientes.filter(e => e.nome.toLocaleLowerCase().includes(valor.toLocaleLowerCase()));
        if (!this.listaFiltrada.length) {
            this.profile = null;
            this.showProfile = false;
        }
    }

    onBlur(valor: string) {
        setTimeout(() => {
            this.listaFiltrada = [];
            this.showList = false;
            this.showProfile = false;
        }, 135);
        this.onTouched();
        this.blur.emit();
    }

    novoPaciente() {
        this.adicionar.emit();
    }

    selecionar(value: ListagemPacientes) {
        this._model = value.nome;
        this.onChange(this._model);
        this.selectItem.emit(value);
    }

    keyUp(evento: KeyboardEvent) {
        this.selectItem.emit(null);
    }
}
