import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'ngx-perfil-pacientes',
  templateUrl: 'perfil.component.html',
  styles: [`:host {
    display: block;
    max-height: 25rem;
  }

  .card-row {
    display: flex;
    margin: 0 -0.5rem;
  }

  .card-col {
    flex: 1 0 calc(50% - 1rem);
    margin: 0 0.5rem;
  }

  .fix-modal {
    width: 600px;
    padding: 18px 18px 0px 18px;
  }`]
})
export class PerfilPacientesComponent implements OnInit, AfterViewInit {

  public isLoading: boolean;
  public user: any;

  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<PerfilPacientesComponent>,
    private service: SmartTableData) { }

  async ngOnInit() {
    await this.obterUsuário();
  }

  async ngAfterViewInit() {
  }

  dismiss() {
    this.ref.close(false);
  }

  perfil() {
    this.ref.close(true);
  }

  async obterUsuário() {
    this.isLoading = true;
    await this.service.getID(this.id).then(response => {
      this.user = response;
      this.isLoading = false;
    });
  }
}
