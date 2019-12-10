import { Injectable } from '@angular/core';

interface Storage {
    consulta: number;
}

@Injectable({providedIn: 'root'})
export class StorageService {

    public storage: Storage = {
        consulta: null
    };

    constructor() { }

    clear() {
        this.storage = {
            consulta: null
        };
    }
}
