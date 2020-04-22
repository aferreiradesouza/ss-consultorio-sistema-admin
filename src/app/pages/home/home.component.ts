import { Component, OnInit, EventEmitter } from '@angular/core';
import { HomeService } from './home.service';
import { FormatterService } from '../../shared/services/formatter.service';
import { NbToastrService } from '@nebular/theme';
import { TOASTR } from '../../shared/constants/toastr';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Login } from '../../shared/interface';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public interval = [
    { label: 'Essa semana', value: '1' },
    { label: 'Mês atual', value: '2' },
    { label: 'Mês passado', value: '3' },
    { label: 'Ano atual', value: '4' },
    { label: 'Ano passado', value: '5' },
  ];

  public loadingInfoGerais = false;

  public infoGerais = [
    { name: 'totalPacientes', icon: 'people-outline', color: '#f39c12', title: 'Total de pacientes atendidos', col: { sm: '6', md: '3', lg: '3' }, data: '-', formatter: null },
    { name: 'totalConsultas', icon: 'file-text-outline', color: '#d35400', title: 'Total de consultas', col: { sm: '6', md: '3', lg: '3' }, data: '-', formatter: null },
    { name: 'totalMedicos', icon: 'activity-outline', color: '#c0392b', title: 'Total de médicos', col: { sm: '6', md: '3', lg: '3' }, data: '-', formatter: null },
    { name: 'totalRecepcionista', icon: 'person-outline', color: '#2980b9', title: 'Total de recepcionista', col: { sm: '6', md: '3', lg: '3' }, data: '-', formatter: null },
    { name: 'totalDiasAtendimento', icon: 'calendar-outline', color: '#27ae60', title: 'Total de dias de atendimento', col: { sm: '6', md: '4', lg: '-' }, data: '-', formatter: null },
    { name: 'totalConsultorios', icon: 'pin-outline', color: '#16a085', title: 'Total de consultórios', col: { sm: '6', md: '4', lg: '4' }, data: '-', formatter: null },
    { name: 'totalArrecadado', icon: 'credit-card-outline', color: '#2c3e50', title: 'Total arrecadado', col: { sm: '6', md: '4', lg: '4' }, data: '-', formatter: (value) => this.formatter.currency(value) },
  ];

  pieObject = {
    chart: {
      width: 450,
      type: 'pie'
    },
  };

  barObject = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    }
  };
  private cancellationToken = new EventEmitter();

  constructor(private homeService: HomeService, private formatter: FormatterService,
    private toastrService: NbToastrService, private localStorage: LocalStorageService) {
    this.homeService.resetGraphs();
  }

  get graphs() {
    const permissions = this.permissaoAdmFin();
    return this.homeService.graphs.filter(e => {
      if (e.guard === null) {
        return true;
      } else {
        let permitido = false;
        for (const item of e.guard) {
          const index = permissions.indexOf(item);
          if (index > -1) {
            permitido = true;
            break;
          }
        }
        return permitido;
      }
    });
  }

  permissaoAdmFin() {
    const user = this.localStorage.getJson('login') as Login;
    let permissions = [];
    if (user && user.ehFinanceiro) {
      permissions = [...permissions, 'Financeiro'];
    }
    if (user && user.ehAdministrador) {
      permissions = [...permissions, 'Administrador'];
    }
    return permissions;
  }

  showInfoGeral() {
    const regras = ['Administrador', 'Financeiro'];
    const permissions = this.permissaoAdmFin();
    let permitido = false;
    for (const item of regras) {
      const index = permissions.indexOf(item);
      if (index > -1) {
        permitido = true;
        break;
      }
    }
    return permitido;
  }

  getGrids(grids: { sm: string, md: string, lg: string }) {
    return [`col-${grids.sm}`, `col-sm-${grids.sm}`, `col-md-${grids.md}`, `col-ld-${grids.lg}`];
  }

  cancelRequests() {
    this.cancellationToken.emit(true);
  }

  ngOnInit() {
    this.obterinfoGerais();
    this.obterDados();
  }

  obterDados() {
    this.graphs.forEach(e => {
      this.requisition(e);
    });
  }

  obterinfoGerais() {
    this.loadingInfoGerais = true;
    this.homeService.getDataGraph('infoSistema', null, this.cancellationToken).then(response => {
      if (response.sucesso) {
        Object.keys(response.objeto).forEach(e => {
          const index = this.infoGerais.findIndex(f => f.name === e);
          if (index > -1) {
            if (this.infoGerais[index].formatter) {
              this.infoGerais[index].data = this.infoGerais[index].formatter(response.objeto[e]);
            } else {
              this.infoGerais[index].data = response.objeto[e];
            }
          }
        });
      } else {
        this.toastrService.show('', response.mensagens[0], { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao, { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.loadingInfoGerais = false;
    });
  }

  obterDataEspecifico(nome: string) {
    const index = this.homeService.obterIndex(nome, 'nome');
    this.requisition(this.graphs[index]);
  }

  requisition(item) {
    this.homeService.resetStategraph(item.nome);
    this.homeService.mudarEstadoLoading(item.nome as any, true);
    this.homeService.getDataGraph(item.nome as any, item.interval, this.cancellationToken).then(response => {
      if (response) {
        if (response === 'noData') {
          item.noData = true;
          return;
        }
        if (item.grafico === 'pie') {
          item.series = response;
        } else {
          item.xaxis = {
            categories: response.consultorios
          };
          item.series = response.data;
        }
      } else {
        item.error = true;
      }
    }).catch(err => {
      item.error = true;
    }).finally(() => {
      this.homeService.mudarEstadoLoading(item.nome as any, false);
    });
  }
}
