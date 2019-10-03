import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { ListagemPacientes, ListagemUsuario, ListagemConsultorios, TiposAtendimento } from '../../../shared/interface';

@Component({
  selector: 'ngx-agendar-consulta',
  templateUrl: 'agendar-consulta.component.html',
  styleUrls: ['agendar-consulta.component.scss']
})
export class AgendarConsultaComponent implements OnInit {

  public isLoading: boolean;
  public pacientes: ListagemPacientes[];

  public form = new FormGroup({
    paciente: new FormControl(''),
    tipoAtendimento: new FormControl(''),
    teste: new FormControl('')
  });

  @Input() medico: ListagemUsuario;
  @Input() consultorio: ListagemConsultorios;
  @Input() data: any;
  @Input() tiposAtendimento: TiposAtendimento[];

  constructor(
    protected ref: NbDialogRef<AgendarConsultaComponent>,
    private pacientesService: PacientesService) { }

  async ngOnInit() {
    console.log(this.medico, this.consultorio, this.data);
    this.isLoading = true;
    await this.pacientesService.obterPacientes().then(response => {
      if (response.sucesso) {
        this.pacientes = response.objeto;
      } else {
        this.dismiss();
      }
    }).catch(err => {
      this.dismiss();
    }).finally(() => {
      this.isLoading = false;
    })
  }

  dismiss() {
    this.ref.close(false);
  }

  deletar() {
    this.ref.close(true);
  }

  disabledButtonAddPaciente(): boolean {
    return this.form.get('paciente').value;
  }
}
