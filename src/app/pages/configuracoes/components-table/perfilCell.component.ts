import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-channel-attribute-renderer',
  template: `{{this.getPerfil()}}`,
  styles: [`
    :host nb-user div.user-container div.user-picture {
      background-position: center;
    }
  `]
})
export class PerfilCellComponent {

constructor() { }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

  getPerfil() {
      const perfis = [];
      if (this.rowData.ehAdministrador) { perfis.push('Administrador'); }
      if (this.rowData.ehMedico) { perfis.push('Médico'); }
      if (this.rowData.ehFinanceiro) { perfis.push('Financeiro'); }
      if (this.rowData.ehRecepcionista) { perfis.push('Recepcionista'); }
      return perfis.length ? perfis.map(e => ` ${e}`).join() : 'Nenhum perfil selecionado';
  }

}
