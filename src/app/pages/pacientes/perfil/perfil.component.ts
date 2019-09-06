import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { SmartTableData } from '../../../@core/data/smart-table';
import * as moment from 'moment';
import { NbMenuService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-perfil-pacientes',
  templateUrl: 'perfil.component.html',
  styles: [`section {
    font-size: 12px;
  } `]
})
export class PerfilPacientesComponent implements OnInit {

  public isLoading: boolean;
  public user: any;

  constructor(public route: ActivatedRoute,
    private service: SmartTableData, public menuService: NbMenuService) { }

  async ngOnInit() {
    this.menuService.collapseAll();
    await this.obterUsuario();
  }

  async obterUsuario() {
    this.isLoading = true;
    const id = parseInt(this.route.snapshot.queryParams.id, 10);
    await this.service.getID(id).then(response => {
      this.user = response;
      this.isLoading = false;
    });
  }
}
