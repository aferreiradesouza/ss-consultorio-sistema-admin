import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { CAMPOS } from '../../../shared/constants/campos-documento';
import { LocalDataSource } from 'ng2-smart-table';
import { CellStatusTableComponent } from '../components-table/cell-status-table.component';
import { Router } from '@angular/router';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { Usuario, ListagemUsuario } from '../../../shared/interface';
import { NbToastrService } from '@nebular/theme';
import { TOASTR } from '../../../shared/constants/toastr';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { DocumentosEnum } from '../../../shared/enums/documentos.enum';

@Component({
    selector: 'ngx-modelos-documentos',
    templateUrl: 'modelos-documentos.component.html',
    styleUrls: ['modelos-documentos.component.scss']
})

export class ModelosDocumentosComponent implements OnInit {
    public editorData: any;
    public searchStep1: any;
    public searchStep2: any;
    public isLoading: boolean;
    public medicos: ListagemUsuario[];
    public medicosFiltrado: ListagemUsuario[];
    public medicoSelecionado: ListagemUsuario;
    public step: 1 | 2 = 1;

    source: LocalDataSource = new LocalDataSource();

    settings = {
        noDataMessage: 'Sem dados',
        hideSubHeader: true,
        mode: 'external',
        actions: {
            columnTitle: 'Ações',
            position: 'right',
            custom: [
                {
                    name: 'perfil',
                    title: '<i class="nb-person"></i>'
                },
                {
                    name: 'edit',
                    title: '<i class="nb-edit"></i>'
                },
                {
                    name: 'delete',
                    title: '<i class="nb-trash"></i>'
                }
            ],
            add: false,
            edit: false,
            delete: false
        },
        columns: {
            profissional: {
                title: 'Profissional',
                type: 'string'
            },
            tipo: {
                title: 'Tipo',
                type: 'string'
            },
            status: {
                title: 'Status',
                type: 'custom',
                renderComponent: CellStatusTableComponent
            },
        },
    };

    constructor(public router: Router,
        private recepcionistaService: RecepcionistaService,
        private configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService, ) { }

    async ngOnInit() {
        await this.obterMedicos();
    }

    public async obterMedicos(): Promise<void> {
        this.isLoading = true;
        await this.recepcionistaService.obterMedicos().then(response => {
            if (response.sucesso) {
                this.medicos = response.resultado;
                this.medicosFiltrado = this.medicos;
            } else {
                this.toastrService.show('', response.error,
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
                this.medicos = [];
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            this.medicos = [];
        }).finally(() => {
            this.isLoading = false;
        });
    }

    setStep(num: 1 | 2): void {
        this.step = num;
    }

    async obterListaDocumentos() {
        this.isLoading = true;
        await this.configuracoesService.listarDocumentos(this.medicoSelecionado.id).then(resp => {
            if (resp.sucesso) {
                const listagem = resp.objeto.map(e => {
                    return {
                        profissional: this.medicoSelecionado.nome,
                        tipo: DocumentosEnum.obterDescricao(e.tipoTemplate),
                        status: e.ativo
                    };
                });
                this.source.load(listagem);
            } else {
                this.toastrService.show('', resp.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoading = false;
        });
    }

    filtrarMedico(nome: string) {
        if (!nome) {
            this.medicosFiltrado = this.medicos;
            return;
        }
        this.medicosFiltrado = this.medicos.filter(e => e.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase()));
    }

    async selecionarMedico(medico: Usuario) {
        this.setStep(2);
        this.medicoSelecionado = medico;
        await this.obterListaDocumentos();
    }

    customAction(event) {
        console.log(event);
    }

    onSearch(query: string = '') {
        if (query === '') {
            this.source.reset();
        } else {
            this.source.setFilter([
                {
                    field: 'nome',
                    search: query
                },
                {
                    field: 'profissional',
                    search: query
                },
                {
                    field: 'tipo',
                    search: query
                }
            ], false);
        }
    }

    novoModelo() {
        this.router.navigateByUrl('/cadastros/modelos-documentos/adicionar');
    }
}
