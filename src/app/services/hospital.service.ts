import { Injectable } from '@angular/core';
import { Ihospital } from '../prototypes/hospitalprototype';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HospitalsService {
  _hospital:Ihospital[];
  constructor(private _http:Http) {       
  }

  getHospitals():Observable <Ihospital[]>{
        return this._http.get( environment.apiUrl + 'hospitals').map((response:Response) => <Ihospital[]> response.json())
        .catch(this.handleError);
    }
    
    handleError(error:Response){
        return Observable.throw(error);
    }

    getDepartments(){
        return this._http.get(environment.apiUrl + "departments")
               .map(this.extractData)
               .catch(this.handleErrorObservable); 
    }

    saveHospital(hospitalData:Ihospital):Observable<Ihospital>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post( environment.apiUrl + "hospitals", hospitalData, options)
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
