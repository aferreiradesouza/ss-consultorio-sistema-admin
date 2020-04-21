import { Injectable } from '@angular/core';
import { AjaxService } from '../../shared/services/ajax.service';
import { Observable } from 'rxjs';
import { UtilService } from '../../shared/services/util.service';
import { environment } from '../../../environments/environment';
import { IGraficoInformacoesSistema, ITiposPacientesConsultorios, IArrecadacaoPorConsultorio, IDesistenciaPorConsultorio, ICancelamentoPorConsultorio, IAtendimentoPorConsultorio, IFormasPagamentoPorConsultorio } from '../../shared/interface';
import { FORMA_PAGAMENTO } from '../../shared/constants/forma-pagamento';

type NomeGrafico = 'infoSistema' | 'tiposPacientesPorConsultorio';

@Injectable({ providedIn: 'root' })
export class HomeService {

    public graphs = [
        {
            nome: 'infoSistema',
            grid: {
                sm: '12',
                md: '5',
                lg: '5'
            },
            grafico: 'pie',
            titulo: 'Infomações gerais',
            series: null,
            labels: ['Total Pacientes', 'Total Consultas', 'Total Medicos', 'Total Recepcionista', 'Total DiasAtendimento', 'Total Consultorios', 'Total Arrecadado'],
            isLoading: true,
            error: false,
            xaxis: null,
            noData: false,
            interval: '4'
        },
        {
            nome: 'tiposPacientesPorConsultorio',
            grid: {
                sm: '12',
                md: '7',
                lg: '7'
            },
            grafico: 'bar',
            titulo: 'Tipos pacientes por consultório',
            series: null,
            labels: [],
            isLoading: true,
            error: false,
            xaxis: null,
            noData: false,
            interval: '4'
        },
        {
            nome: 'arrecadacaoPorConsultorio',
            grid: {
                sm: '12',
                md: '6',
                lg: '6'
            },
            grafico: 'bar',
            titulo: 'Arrecadação por consultório',
            series: null,
            labels: [],
            isLoading: true,
            error: false,
            xaxis: null,
            noData: false,
            interval: '4'
        },
        {
            nome: 'desistenciaPorConsultorio',
            grid: {
                sm: '12',
                md: '6',
                lg: '6'
            },
            grafico: 'bar',
            titulo: 'Desistência por consultório',
            series: null,
            labels: [],
            isLoading: true,
            error: false,
            xaxis: null,
            noData: false,
            interval: '4'
        },
        {
            nome: 'cancelamentosPorConsultorio',
            grid: {
                sm: '12',
                md: '6',
                lg: '6'
            },
            grafico: 'bar',
            titulo: 'Cancelamento por consultório',
            series: null,
            labels: [],
            isLoading: true,
            error: false,
            xaxis: null,
            noData: false,
            interval: '4'
        },
        {
            nome: 'atendimentosPorConsultorio',
            grid: {
                sm: '12',
                md: '6',
                lg: '6'
            },
            grafico: 'bar',
            titulo: 'Atendimento por consultório',
            series: null,
            labels: [],
            isLoading: true,
            error: false,
            xaxis: null,
            noData: false,
            interval: '4'
        },
        {
            nome: 'formasPagamentoPorConsultorio',
            grid: {
                sm: '12',
                md: '6',
                lg: '6'
            },
            grafico: 'bar',
            titulo: 'Formas de pagamento por consultório',
            series: null,
            labels: [],
            isLoading: true,
            error: false,
            xaxis: null,
            noData: false,
            interval: '4'
        },
    ];

    constructor(private ajax: AjaxService, private util: UtilService) { }

    mudarEstadoLoading(nome: NomeGrafico, value: boolean) {
        const index = this.obterIndex(nome, 'nome');
        this.graphs[index].isLoading = value;
    }

    resetGraphs() {
        this.graphs.forEach(e => {
            e.isLoading = true;
            e.noData = false;
            e.error = false;
        });
    }

    resetStategraph(nome: string) {
        const index = this.obterIndex(nome, 'nome');
        this.graphs[index].noData = false;
        this.graphs[index].error = false;
    }

    obterIndex(data: any, prop: string) {
        return this.graphs.map(e => e[prop]).indexOf(data);
    }

    getDataGraph(type: NomeGrafico, interval: string, cancellationToken: Observable<any> = null): Promise<any> {
        const ajax = this.ajax;
        const util = this.util;
        let cancelado = false;

        if (cancellationToken) {
            const subscription = cancellationToken.subscribe((cancelar: boolean) => {
                cancelado = cancelar;
                subscription.unsubscribe();
            });
        }

        const req = {
            async infoSistema() {
                const url = `${environment.urlBase}admin/dashboard/informacoesDoSistema`;
                const response = await ajax.get<IGraficoInformacoesSistema>(url);
                if (!cancelado) {
                    return util.loading(400, () => {
                        if (response.sucesso) {
                            return Object.values(response.objeto);
                        } else {
                            return null;
                        }
                    });
                }
            },
            async tiposPacientesPorConsultorio() {
                const url = `${environment.urlBase}admin/dashboard/tiposPacientePorConsultorio/${interval}`;
                const response = await ajax.get<ITiposPacientesConsultorios>(url);
                if (!cancelado) {
                    return util.loading(400, () => {
                        if (response.sucesso) {
                            if (!response.objeto.length) {
                                return 'noData';
                            }
                            const consultorios = response.objeto.map(e => e.nomeConsultorio);
                            const data = [
                                {
                                    name: 'Total de Pacientes Novos',
                                    data: response.objeto.map(e => e.totalPacientesNovos)
                                }, {
                                    name: 'Total de Pacientes Frequentes',
                                    data: response.objeto.map(e => e.totalPacientesFrequentes)
                                }
                            ];
                            return {
                                consultorios,
                                data
                            };
                        } else {
                            return null;
                        }
                    });
                }
            },
            async arrecadacaoPorConsultorio() {
                const url = `${environment.urlBase}admin/dashboard/arrecadacaoPorConsultorio/${interval}`;
                const response = await ajax.get<IArrecadacaoPorConsultorio>(url);
                if (!cancelado) {
                    return util.loading(400, () => {
                        if (response.sucesso) {
                            if (!response.objeto.length) {
                                return 'noData';
                            }
                            const consultorios = response.objeto.map(e => e.nomeConsultorio);
                            const data = [
                                {
                                    name: 'Total recebido',
                                    data: response.objeto.map(e => e.totalRecebido)
                                }, {
                                    name: 'Total Consulta',
                                    data: response.objeto.map(e => e.totalConsulta)
                                }
                            ];
                            return {
                                consultorios,
                                data
                            };
                        } else {
                            return null;
                        }
                    });
                }
            },
            async desistenciaPorConsultorio() {
                const url = `${environment.urlBase}admin/dashboard/desistenciaPorConsultorio/${interval}`;
                const response = await ajax.get<IDesistenciaPorConsultorio>(url);
                if (!cancelado) {
                    return util.loading(400, () => {
                        if (response.sucesso) {
                            if (!response.objeto.length) {
                                return 'noData';
                            }
                            const consultorios = response.objeto.map(e => e.nomeConsultorio);
                            const data = [
                                {
                                    name: 'Total',
                                    data: response.objeto.map(e => e.total)
                                }
                            ];
                            return {
                                consultorios,
                                data
                            };
                        } else {
                            return null;
                        }
                    });
                }
            },
            async cancelamentosPorConsultorio() {
                const url = `${environment.urlBase}admin/dashboard/cancelamentosPorConsultorio/${interval}`;
                const response = await ajax.get<ICancelamentoPorConsultorio>(url);
                if (!cancelado) {
                    return util.loading(400, () => {
                        if (response.sucesso) {
                            if (!response.objeto.length) {
                                return 'noData';
                            }
                            const consultorios = response.objeto.map(e => e.nomeConsultorio);
                            const data = [
                                {
                                    name: 'Total',
                                    data: response.objeto.map(e => e.total)
                                }
                            ];
                            return {
                                consultorios,
                                data
                            };
                        } else {
                            return null;
                        }
                    });
                }
            },
            async atendimentosPorConsultorio() {
                const url = `${environment.urlBase}admin/dashboard/atendimentosPorConsultorio/${interval}`;
                const response = await ajax.get<IAtendimentoPorConsultorio>(url);
                if (!cancelado) {
                    return util.loading(400, () => {
                        if (response.sucesso) {
                            if (!response.objeto.length) {
                                return 'noData';
                            }
                            const consultorios = response.objeto.map(e => e.nomeConsultorio);
                            const data = [
                                {
                                    name: 'Total',
                                    data: response.objeto.map(e => e.totalAtendimento)
                                }
                            ];
                            return {
                                consultorios,
                                data
                            };
                        } else {
                            return null;
                        }
                    });
                }
            },
            async formasPagamentoPorConsultorio() {
                const url = `${environment.urlBase}admin/dashboard/formasPagamentosPorConsultorio/${interval}`;
                const response = await ajax.get<IFormasPagamentoPorConsultorio>(url);
                if (!cancelado) {
                    return util.loading(400, () => {
                        if (response.sucesso) {
                            if (!response.objeto.length) {
                                return 'noData';
                            }
                            const consultorios = response.objeto.map(e => e.nomeConsultorio);
                            const pagamentos = FORMA_PAGAMENTO;
                            const data = pagamentos.map(e => {
                                return  {
                                    name: e,
                                    data: response.objeto.map(m => m.formasPagamentos.filter(f => f === e).length)
                                };
                            });
                            return {
                                consultorios,
                                data
                            };
                        } else {
                            return null;
                        }
                    });
                }
            }
        };
        return new Promise(async (resolve, reject) => {
            const response = await req[type]().catch(e => reject(e));

            if (response) {
                resolve(response);
            }
        });
    }
}
