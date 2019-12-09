import { Injectable } from '@angular/core';
import { Iuser } from '../prototypes/usersprototype';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http:Http) { }

  getUsers():Observable <Iuser[]>{
        return this._http.get('http://localhost:3000/users').map((response:Response) => <Iuser[]> response.json())
        .catch(this.handleError);
    }
    
    handleError(error:Response){
        return Observable.throw(error);
    }

    saveUser(userData:Iuser):Observable<Iuser>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post("http://localhost:3000/users", userData, options)
               .map(this.extractData)
               .catch(this.handleErrorObservable);
    }

    extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}
