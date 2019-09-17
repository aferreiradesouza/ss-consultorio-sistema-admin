import { Injectable } from '@angular/core';
import { ProfissionalData } from '../data/profissional';

@Injectable()
export class ProfissionalMockService extends ProfissionalData {

    public data = [
        { id: 1, nome: 'André Domarco', email: 'andre.domarco@gmail.com', telefone: '2133810462', status: true },
        { id: 2, nome: 'Rafael Silveira', email: 'rafael.silveira@gmail.com', telefone: '2133810462', status: true },
    ];

    getData(): any[] {
        return this.data;
    }

    async getProfissionaisWithLoading(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(this.data);
            }, 3000);
        });
    }

    async getProfissional(data): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(this.data.find(e => e.id === data));
            }, 3000);
        });
    }
}
