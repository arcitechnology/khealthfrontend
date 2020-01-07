import { Injectable } from '@angular/core';
import { Iuser } from '../prototypes/usersprototype';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private _http: Http, private http: HttpClient) { }

    getUsers(): Observable<Iuser[]> {
        return this.http.get(environment.apiUrl + 'users').pipe(map((user: Iuser[]) => {
            return user;
        }));
    }

    getUserDetails(id: any): Observable<Iuser[]> {
        return this.http.get(environment.apiUrl + 'users/' + id).pipe(map((user: Iuser[]) => {
            return user;
        }));
    }

    getUserInfo(): Observable<Iuser[]> {
        return this.http.get(environment.apiUrl + 'me').pipe(map((user: Iuser[]) => {
            return user;
        }));
    }

    saveUser(userData: any): Observable<Iuser> {
       // let headers = new Headers({ 'Content-Type': 'application/json' });
       // let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.apiUrl + "users", userData).pipe(map((user: Iuser) => {
            return user;
        }));
    }
	
	updateUser(userData: any, userId:any): Observable<Iuser> {
       // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        return this.http.put(environment.apiUrl + "users/" + userId, userData).pipe(map((user: Iuser) => {
            return user;
        }));
    }

    updatePassword(data: any, id: any) {
        return this.http.put(environment.apiUrl + "changepassword", data);
    }

    updateUserInfo(data: any) {
        return this.http.put(environment.apiUrl + "updateprofile", data);
    }

    extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

}
