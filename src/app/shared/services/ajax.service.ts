import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { reject } from 'q';

@Injectable({
    providedIn: 'root'
})
export class AjaxService {

    public token = '443AA87BA954950A5B4514417CF0F40C1238C0A25DABFF3ECB8EE17EF61A4E638E8A0FF67534DAF21059DC9C3EE4E7143200A729EFBABB4D16C46F48FD62002A';

    constructor(
        private http: HttpClient
    ) { }

    public async get<T>(
        url: string,
        params: { [param: string]: string | string[] } = {}
    ) {
        const token = this.token;
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: 'bearer ' + token
        };

        return this.http
            .get<T>(url, { params, headers })
            .pipe(timeout(15000))
            .toPromise()
            .catch(error => {
                reject(error);
            });
    }
    public async post<T>(url: string, body: any = {}) {
        const token = this.token;
        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: 'bearer ' + token
            }
        };

        return this.http
            .post<T>(url, body, options)
            .pipe(timeout(15000))
            .toPromise()
            .catch(error => {
                reject(error);
            });
    }

    public async put<T>(url: string, body: any = {}) {
        const token = this.token;
        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: 'bearer ' + token
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
