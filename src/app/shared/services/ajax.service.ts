import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { reject } from 'q';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AjaxService {

    public token: string;
    constructor(
        private http: HttpClient,
        public storageService: LocalStorageService
    ) { }

    public async get<T>(
        url: string,
        params: { [param: string]: string | string[] } = {}
    ) {
        const token = this.storageService.has('token') ? this.storageService.get('token') : null;
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: 'bearer ' + token,
            'sistema': 'sim'
        };

        return this.http
            .get<T>(url, { params, headers })
            .pipe(timeout(15000))
            .toPromise();
    }

    public async delete<T>(
        url: string,
        params: { [param: string]: string | string[] } = {}
    ) {
        const token = this.storageService.has('token') ? this.storageService.get('token') : null;
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: 'bearer ' + token,
            'sistema': 'sim'
        };

        return this.http
            .delete<T>(url, { params, headers })
            .pipe(timeout(15000))
            .toPromise();
    }

    public async post<T>(url: string, body: any = {}) {
        const token = this.storageService.has('token') ? this.storageService.get('token') : null;
        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: 'bearer ' + token,
                'sistema': 'sim'
            }
        };

        return this.http
            .post<T>(url, body, options)
            .pipe(timeout(15000))
            .toPromise();
    }

    public async put<T>(url: string, body: any = {}) {
        const token = this.storageService.has('token') ? this.storageService.get('token') : null;
        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: 'bearer ' + token,
                'sistema': 'sim'
            }
        };

        return this.http
            .put<T>(url, body, options)
            .pipe(timeout(15000))
            .toPromise()
            .catch(error => {
                reject(error);
            });
    }
}
