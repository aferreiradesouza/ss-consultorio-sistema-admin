import { Injectable } from '@angular/core';

type StorageKey = 'login' | 'token';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public has(key: StorageKey): boolean {
        return key in localStorage;
    }

    public get(key: StorageKey): string {
        return localStorage.getItem(key);
    }

    public getJson(key: StorageKey): any {
        return JSON.parse(this.get(key));
    }

    public set(key: StorageKey, value: string) {
        localStorage.setItem(key, value);
    }

    public setJson(key: StorageKey, value: any) {
        this.set(key, JSON.stringify(value));
    }

    public remove(key: StorageKey) {
        localStorage.removeItem(key);
    }
}
