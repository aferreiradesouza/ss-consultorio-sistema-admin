import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CellStatusTableComponent } from '../components-table/cell-status-table.component';
import { Router } from '@angular/router';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { Usuario, ListagemUsuario } from '../../../shared/interface';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { TOASTR } from '../../../shared/constants/toastr';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { DocumentosEnum } from '../../../shared/enums/documentos.enum';
import { EditarModelosDocumentosComponent } from './editar-documentos/editar-documentos.component';
import { PREVIEW } from '../../../shared/constants/pdf';

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
                    name: 'visualizar',
                    title: '<i class="nb-search"></i>'
                },
                {
                    name: 'edit',
                    title: '<i class="nb-edit"></i>'
                }
            ],
            add: false,
            edit: false,
            delete: false
        },
        columns: {
            nome: {
                title: 'Nome',
                type: 'string',
                valuePrepareFunction: (value) => {
                    return value || '-';
                }
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
        public dialogService: NbDialogService,
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
                        nome: e.nome,
                        tipo: DocumentosEnum.obterDescricao(e.tipoTemplate),
                        status: e.ativo,
                        dados: e
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
        if (event.action === 'visualizar') {
            this.verTemplate(event);
        } else if (event.action === 'edit') {
            this.editar(event);
        }
    }

    verTemplate(event) {
        const popupWin = window.open('', '_blank', `width=${PREVIEW.width},height=${PREVIEW.height},location=no,left=200px`);
        popupWin.document.open();
        popupWin.document.write(`<html><title>${event.data.nome || '-'}</title></head><body">`);
        popupWin.document.write(event.data.dados.textoHtml);
        popupWin.document.write('</html>');
        popupWin.document.close();
    }

    editar(event) {
        this.dialogService.open(
            EditarModelosDocumentosComponent,
            {
                context: {
                    id: event.data.id,
                    data: event.data.dados
                },
                closeOnEsc: true,
                autoFocus: false,
                closeOnBackdropClick: false,
                hasScroll: true
            }).onClose.subscribe(async (response: boolean) => {
                if (response) {
                    await this.obterListaDocumentos();
                }
            });
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
