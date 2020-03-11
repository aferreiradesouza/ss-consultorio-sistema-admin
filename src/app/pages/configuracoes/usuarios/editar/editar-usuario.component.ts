import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { Usuario } from '../../../../shared/interface';
import * as moment from 'moment';
import { TOASTR } from '../../../../shared/constants/toastr';
import { UtilService } from '../../../../shared/services/util.service';

@Component({
    selector: 'ngx-editar-usuario',
    templateUrl: 'editar-usuario.component.html',
    styleUrls: ['editar-usuario.component.scss']
})

export class EditarUsuarioComponent implements OnInit {
    public form = new FormGroup({
        nome: new FormControl(''),
        email: new FormControl(''),
        telefone: new FormControl(''),
        celular: new FormControl(''),
        nascimento: new FormControl(''),
        urlFoto: new FormControl(''),
        cpf: new FormControl(''),
        idade: new FormControl({ value: '', disabled: true }),
        crm: new FormControl(''),
        status: new FormControl(false),
        senha: new FormControl(''),
        confSenha: new FormControl('')
    });

    public patternUrl = new RegExp(/^(ftp|https?):\/\/+(www\.)?/);

    public user: Usuario;
    perfis = new FormControl([]);

    public isLoading: boolean;
    public requiredCrm = false;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<EditarUsuarioComponent>,
        private configuracoesService: ConfiguracoesService,
        private utilService: UtilService) { }

    async ngOnInit() {
        this.isLoading = true;
        await this.configuracoesService.obterInfoUsuario(this.id).then(response => {
            if (response.sucesso) {
                this.user = response.objeto;
                this.preencherPasso(this.user);
            } else {
                this.dismiss({ sucesso: false, mensagem: response.mensagens[0] });
            }
        }).catch(err => {
            this.dismiss({ sucesso: false, mensagem: TOASTR.msgErroPadrao });
        });
        this.isLoading = false;

        this.form.get('nascimento').valueChanges.subscribe(val => {
            if (val.length === 10) {
                setTimeout(() => {
                    const hoje = moment();
                    const dataNascimento = moment(this.form.value.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
                    const idade = hoje.diff(dataNascimento, 'years', false);
                    this.form.get('idade').setValue(idade);
                }, 0);
            }
        });

        this.perfis.valueChanges.subscribe(valor => {
            if (valor.indexOf('medico') > -1) {
                this.requiredCrm = true;
            } else {
                this.requiredCrm = false;
            }
        });

        this.requiredCrm = this.perfis.value.indexOf('medico') > -1;
    }

    dismiss(status: { sucesso: boolean, mensagem: string }) {
        this.ref.close(status);
    }

    async editar() {
        this.isLoading = true;
        const form = this.form.value;
        const dados: any = {
            id: this.user.id,
            nome: form.nome || null,
            cpf: form.cpf ? form.cpf.replace(new RegExp(/[.\-]/, 'g'), '') : null,
            ehMedico: this.perfis.value.indexOf('medico') > -1,
            ehFinanceiro: this.perfis.value.indexOf('financeiro') > -1,
            ehRecepcionista: this.perfis.value.indexOf('recepcionista') > -1,
            crm: form.crm || null,
            celular: form.celular || null,
            telefone: form.telefone || null,
            email: form.email || null,
            urlFoto: form.urlFoto || null,
            ehAdministrador: this.perfis.value.indexOf('administracao') > -1,
            dataNascimento: form.nascimento ? moment(form.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            ativo: form.status
        };

        if (this.form.value.senha) {
            dados.senha = this.form.value.senha;
        }

        await this.configuracoesService.alterarUsuario(dados).then(response => {
            if (response.sucesso) {
                this.dismiss({ sucesso: true, mensagem: 'Usuário alterado com sucesso!' });
            } else {
                this.dismiss({ sucesso: false, mensagem: response.mensagens[0] });
            }
        }).catch(err => {
            this.dismiss({ sucesso: false, mensagem: TOASTR.msgErroPadrao });
        });
    }

    getImage() {
        return this.patternUrl.test(this.form.value.urlFoto) ? this.form.value.urlFoto : null;
    }

    getTitle() {
        const ret = [];
        if (this.perfis.value.indexOf('administracao') > -1) {
            ret.push('Admistração');
        }
        if (this.perfis.value.indexOf('medico') > -1) {
            ret.push('Médico');
        }
        if (this.perfis.value.indexOf('recepcionista') > -1) {
            ret.push('Recepcionista');
        }
        if (this.perfis.value.indexOf('financeiro') > -1) {
            ret.push('Financeiro');
        }
        return ret.length ? ret.map(e => ` ${e}`).join() : '-';
    }

    preencherPasso(user: Usuario) {
        this.form.patchValue({
            nome: user.nome,
            email: user.email,
            status: user.ativo,
            telefone: user.telefone,
            celular: user.celular,
            nascimento: moment(user.dataNascimento).format('DD/MM/YYYY'),
            crm: user.crm,
            cpf: user.cpf,
            urlFoto: user.urlFoto,
            idade: user.dataNascimento ? moment().diff(moment(user.dataNascimento), 'y') : '-',
            senha: null,
            confSenha: null
        });
        const perfil = [];
        if (user.ehMedico) { perfil.push('medico'); }
        if (user.ehAdministrador) { perfil.push('administracao'); }
        if (user.ehFinanceiro) { perfil.push('financeiro'); }
        if (user.ehRecepcionista) { perfil.push('recepcionista'); }
        this.perfis.setValue(perfil);
    }

    showErrorSelect() {
        const control = this.perfis;
        if (!control.valid) {
            if (control.touched && control.dirty) {
                return 'danger';
            } else {
                return undefined;
            }
        } else {
            return 'success';
        }
    }

    senhaValida() {
        if (!this.form.value.senha && !this.form.value.confSenha) {
            return false;
        } else {
            return this.form.value.senha !== this.form.value.confSenha;
        }
    }
}
