import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:Http) {       
  }

    getDashboard():Observable <any>{
        return this._http.get(environment.apiUrl +'dashboard').map((response:Response) => <any> response.json())
        .catch(this.handleError);
    }
	
	getAvailDepart():Observable <any>{
        return this._http.get(environment.apiUrl +'getfordepartmentupdate').map((response:Response) => <any> response.json())
        .catch(this.handleError);
    }
	
	saveAvailDepart(availData: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(environment.apiUrl + 'savecurrentavailability', availData, options).map(this.extractData).catch(this.handleError);
    }
	handleError(error:Response){
        return Observable.throw(error);
    }
	
	extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
