import { Injectable } from '@angular/core';

@Injectable()
export class UsuariosMockService {

    constructor() { }

    public data = [
        { id: 1, nome: 'Arthur Ferreira', email: 'arthur.ferreira@gmail.com', adm: true, status: true },
        { id: 2, nome: 'Rafael Silveira', email: 'rafael.silveira@gmail.com', adm: true, status: true },
        { id: 3, nome: 'Priscila Maia', email: 'pri.maia@gmail.com', adm: true, status: true },
    ];

    getData(): any[] {
        return this.data;
    }

    async getDataWithLoading(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(this.data);
            }, 3000);
        });
    }

    async getDataPerId(data): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(this.data.find(e => e.id === data));
            }, 3000);
        });
    }
}
