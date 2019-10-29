import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { CAMPOS } from '../../../shared/constants/campos-documento';
import { LocalDataSource } from 'ng2-smart-table';
import { CellStatusTableComponent } from '../components-table/cell-status-table.component';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-modelos-documentos',
    templateUrl: 'modelos-documentos.component.html',
    styleUrls: ['modelos-documentos.component.scss']
})

export class ModelosDocumentosComponent implements OnInit {
    public editorData: any;
    public search: any;
    public dataTable = [
        { nome: 'Atestado Teste', tipo: 'Atestado', profissional: 'Arthur', status: true },
        { nome: 'Atestado Teste 1', tipo: 'Atestado', profissional: 'Rafael', status: true },
        { nome: 'Atestado Teste 2', tipo: 'Atestado', profissional: 'Arthur', status: true },
        { nome: 'Atestado Teste 3', tipo: 'Atestado', profissional: 'Rafael', status: true },
    ];

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
            nome: {
                title: 'Nome',
                type: 'string'
            },
            tipo: {
                title: 'Tipo',
                type: 'string'
            },
            profissional: {
                title: 'Profissional',
                type: 'string'
            },
            status: {
                title: 'Status',
                type: 'custom',
                renderComponent: CellStatusTableComponent
            },
        },
    };

    constructor(public router: Router) { }

    ngOnInit() {
        this.source.load(this.dataTable);
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
