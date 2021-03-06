import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbSelectModule, NbCheckboxModule, NbSpinnerModule, NbUserModule, NbToastrModule, NbTabsetModule, NbListModule, NbIconModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnamneseComponent } from './anamnese/anamnese.component';
import { ModelosDocumentosComponent } from './modelos-documentos/modelos-documentos.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { CellStatusTableComponent } from './components-table/cell-status-table.component';
import { CadastroDocumentosComponent } from './modelos-documentos/cadastro-documentos/cadastro-documentos.component';
import { EditarModelosDocumentosComponent } from './modelos-documentos/editar-documentos/editar-documentos.component';

const PAGES = [
  AnamneseComponent,
  ModelosDocumentosComponent,
  CadastroDocumentosComponent
];

const CELL_TABLE = [
  CellStatusTableComponent
];

const MODAIS = [
  EditarModelosDocumentosComponent
];

const NB_MODULES = [
  NbCardModule,
  NbButtonModule,
  Ng2SmartTableModule,
  NbDialogModule.forRoot(),
  NbSelectModule,
  NbCheckboxModule,
  NbSpinnerModule,
  NbUserModule,
  NbCheckboxModule,
  NbToastrModule,
  NbTabsetModule,
  NbListModule,
  NbIconModule,
  NbDatepickerModule,
  NbInputModule
];

@NgModule({
  imports: [
    SharedModule,
    CadastrosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...NB_MODULES
  ],
  declarations: [
    ...CELL_TABLE,
    ...PAGES,
    ...MODAIS
  ],
  entryComponents: [
    ...CELL_TABLE,
    ...MODAIS
  ]
})
export class CadastrosModule { }
