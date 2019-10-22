import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { ListagemConsultorios, Consultorio } from '../../../../shared/interface';
import { TOASTR } from '../../../../shared/constants/toastr';

@Component({
    selector: 'ngx-perfil-unidade-atendimento',
    templateUrl: 'perfil-unidade-atendimento.component.html'
})

export class PerfilUnidadeAtendimentoComponent implements OnInit {
    form = new FormGroup({
        nome: new FormControl({ value: '', disabled: true }),
        telefone: new FormControl({ value: '', disabled: true }),
        cep: new FormControl({ value: '', disabled: true }),
        logradouro: new FormControl({ value: '', disabled: true }),
        numero: new FormControl({ value: '', disabled: true }),
        complemento: new FormControl({ value: '', disabled: true }),
        bairro: new FormControl({ value: '', disabled: true }),
        cidade: new FormControl({ value: '', disabled: true }),
        estado: new FormControl({ value: '', disabled: true }),
        status: new FormControl({ value: false, disabled: true }),
        urlFoto: new FormControl({ value: '', disabled: true })
    });
    public consultorio: Consultorio;

    public isLoading: boolean;
    public patternUrl = new RegExp(/^(ftp|https?):\/\/+(www\.)?/);
    public estados = [
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Pará', value: 'PA' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Rondônia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'Tocantins', value: 'TO' },
    ];

    @Input() id: number;

    constructor(
        protected ref: NbDialogRef<PerfilUnidadeAtendimentoComponent>,
        private configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService) { }

    async ngOnInit() {
        await this.obterConsultorio();
    }

    async obterConsultorio(): Promise<void> {
        this.isLoading = true;
        await this.configuracoesService.obterConsultorioPorId(this.id).then(response => {
            if (response.sucesso) {
                this.consultorio = response.objeto;
                this.preencherForm();
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: <any>TOASTR.position });
                this.dismiss();
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: <any>TOASTR.position });
            this.dismiss();
        }).finally(() => {
            this.isLoading = false;
        });
    }

    getImage() {
        return this.patternUrl.test(this.form.value.urlFoto) ? this.form.value.urlFoto : null;
    }

    dismiss() {
        this.ref.close(false);
    }

    editar() {
        this.ref.close(true);
    }

    preencherForm() {
        this.form.patchValue({
            nome: this.consultorio.nome,
            telefone: this.consultorio.telefone1,
            cep: this.consultorio.cep,
            logradouro: this.consultorio.logradouro,
            numero: this.consultorio.numero,
            complemento: this.consultorio.complemento,
            bairro: this.consultorio.bairro,
            cidade: this.consultorio.cidade,
            estado: this.consultorio.estado,
            status: this.consultorio.ativo,
            urlFoto: this.consultorio.urlFoto
        });
    }
}
