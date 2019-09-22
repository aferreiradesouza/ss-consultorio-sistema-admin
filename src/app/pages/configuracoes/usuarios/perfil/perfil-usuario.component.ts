import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { Usuario } from '../../../../shared/interface';
import * as moment from 'moment';

@Component({
    selector: 'ngx-perfil-usuario',
    templateUrl: 'perfil-usuario.component.html'
})

export class PerfilUsuarioComponent implements OnInit {
    public form = new FormGroup({
        nome: new FormControl({ value: '', disabled: true }),
        email: new FormControl({ value: '', disabled: true }),
        telefone: new FormControl({ value: '', disabled: true }),
        celular: new FormControl({ value: '', disabled: true }),
        nascimento: new FormControl({ value: '', disabled: true }),
        urlFoto: new FormControl({ value: '', disabled: true }),
        cpf: new FormControl({ value: '', disabled: true }),
        idade: new FormControl({ value: '', disabled: true }),
        crm: new FormControl({ value: '', disabled: true }),
        status: new FormControl({ value: false, disabled: true })
    });

    perfis = new FormControl({value: [], disabled: true});

    public isLoading: boolean;
    public teste = [];
    public user: Usuario;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<PerfilUsuarioComponent>,
        private configuracaoService: ConfiguracoesService) { }

    async ngOnInit() {
        this.isLoading = true;
        await this.configuracaoService.obterInfoUsuario(this.id).then(response => {
            if (response.sucesso) {
                this.user = response.objeto;
                this.preencherPasso(response.objeto);
            } else {
                this.dismiss({sucesso: false, mensagem: response.mensagens[0]});
            }
        }).catch(() => {
            this.dismiss({sucesso: false, mensagem: 'Algo de errado aconteceu, tente novamente mais tarde!'});
        });
        this.isLoading = false;
    }

    dismiss(status: {sucesso: boolean, mensagem: string}) {
        this.ref.close(status);
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
