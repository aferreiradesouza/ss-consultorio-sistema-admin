import { Component, OnInit, EventEmitter } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public interval = [
    {label: 'Essa semana', value: '1'},
    {label: 'Mês atual', value: '2'},
    {label: 'Mês passado', value: '3'},
    {label: 'Ano atual', value: '4'},
    {label: 'Ano passado', value: '5'},
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

  constructor(private homeService: HomeService) {
    this.homeService.resetGraphs();
  }

  get graphs() {
    return this.homeService.graphs;
  }

  getGrids(grids: { sm: string, md: string, lg: string }) {
    return [`col-${grids.sm}`, `col-sm-${grids.sm}`, `col-md-${grids.md}`, `col-ld-${grids.lg}`];
  }

  cancelRequests() {
    this.cancellationToken.emit(true);
  }

  ngOnInit() {
    this.obterDados();
  }

  obterDados() {
    this.graphs.forEach(e => {
      this.requisition(e);
    });
  }

  obterDataEspecifico(nome: string) {
    const index = this.homeService.obterIndex(nome, 'nome');
    this.requisition(this.graphs[index]);
  }

  requisition(item) {
    this.homeService.resetStategraph(item.nome);
    this.homeService.mudarEstadoLoading(item.nome as any, true);
    this.homeService.getDataGraph(item.nome as any, item.interval , this.cancellationToken).then(response => {
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
