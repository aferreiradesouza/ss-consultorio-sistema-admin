import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';

type StorageKey = 'login' | 'token' | 'filtro-calendario';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private onSubject = new Subject<{ key: string, value: any }>();
    public changes = this.onSubject.asObservable().pipe(share());

    constructor() { this.start(); }

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

    public getStorage() {
        const s = [];
        for (let i = 0; i < localStorage.length; i++) {
            s.push({
                key: localStorage.key(i),
                value: JSON.parse(localStorage.getItem(localStorage.key(i)))
            });
        }
        return s;
    }

    public store(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
        // the local application doesn't seem to catch changes to localStorage...
        this.onSubject.next({ key: key, value: data });
    }

    public clear(key) {
        localStorage.removeItem(key);
        // the local application doesn't seem to catch changes to localStorage...
        this.onSubject.next({ key: key, value: null });
    }


    private start(): void {
        window.addEventListener('storage', this.storageEventListener.bind(this));
    }

    private storageEventListener(event: StorageEvent) {
        if (event.storageArea === localStorage) {
            let v;
            try {
                v = JSON.parse(event.newValue);
            } catch (e) { v = event.newValue; }
            this.onSubject.next({ key: event.key, value: v });
        }
    }

    private stop(): void {
        window.removeEventListener('storage', this.storageEventListener.bind(this));
        this.onSubject.complete();
    }
}
