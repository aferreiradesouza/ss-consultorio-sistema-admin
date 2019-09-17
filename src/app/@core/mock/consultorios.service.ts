import { Injectable } from '@angular/core';
import { ConsultoriosData } from '../data/consultorios';

@Injectable()
export class ConsultoriosMockService extends ConsultoriosData {

  public data = [
    {id: 1, nome: 'Barra', bairro: 'Barra', telefone: '2133810462', status: true},
    {id: 2, nome: 'Carioca', bairro: 'Vicente de Carvalho', telefone: '2133810462', status: true},
    {id: 3, nome: 'Nova América', bairro: 'Inhaúma', telefone: '2133810462', status: true},
  ];

  getData(): any[] {
    return this.data;
  }

  async getConsultorioWithLoading(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(this.data);
      }, 3000);
    });
  }

  async getConsultorio(data): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(this.data.find(e => e.id === data));
      }, 3000);
    });
  }
}
