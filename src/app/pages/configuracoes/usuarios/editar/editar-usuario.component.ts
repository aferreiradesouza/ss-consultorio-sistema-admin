import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { Usuario } from '../../../../shared/interface';
import * as moment from 'moment';

@Component({
    selector: 'ngx-editar-usuario',
    templateUrl: 'editar-usuario.component.html',
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
        status: new FormControl(false)
    });

    public user: Usuario;
    perfis = new FormControl([]);

    public isLoading: boolean;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<EditarUsuarioComponent>,
        private configuracoesService: ConfiguracoesService) { }

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
            this.dismiss({ sucesso: false, mensagem: 'Não foi pissível obter os dados do usuário. Tente novamente mais tarde!' });
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
    }

    dismiss(status: { sucesso: boolean, mensagem: string }) {
        this.ref.close(status);
    }

    async editar() {
        this.isLoading = true;
        const form = this.form.value;
        const dados = {
            id: this.user.id,
            nome: this.user.nome || null,
            cpf: form.cpf ? form.cpf.replace(new RegExp(/[.\-]/, 'g'), '') : null,
            ehMedico: this.perfis.value.indexOf('medico') > -1,
            crm: form.crm || null,
            celular: form.celular || null,
            telefone: form.telefone || null,
            email: form.email || null,
            urlFoto: form.urlFoto || null,
            ehAdministrador: this.perfis.value.indexOf('administracao') > -1,
            dataNascimento: form.nascimento ? moment(form.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            ativo: form.status,
        };

        await this.configuracoesService.alterarUsuario(dados).then(response => {
            if (response.sucesso) {
                this.dismiss({ sucesso: true, mensagem: 'Usuário alterado com sucesso!' });
            } else {
                this.dismiss({ sucesso: false, mensagem: response.mensagens[0] });
            }
        }).catch(err => {
            this.dismiss({ sucesso: false, mensagem: 'Não foi possível realizar a alteração, tente novamente mais tarde!' });
        });
        this.isLoading = false;
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
        });
        const perfil = [];
        if (user.ehMedico) { perfil.push('medico'); }
        if (user.ehAdministrador) { perfil.push('administracao'); }
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
}
