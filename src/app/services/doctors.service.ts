import { Injectable } from '@angular/core';
import { Idoctor } from '../prototypes/doctorprototype';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DoctorsService {
  _doctors:Idoctor[];
  constructor(private _http:Http) {       
  }

    getDoctors():Observable <Idoctor[]>{
        return this._http.get('http://localhost:3000/doctors').map((response:Response) => <Idoctor[]> response.json())
        .catch(this.handleError);
    }
    
    handleError(error:Response){
        return Observable.throw(error);
    }

    saveDoctor(doctorData:Idoctor):Observable<Idoctor>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post("http://localhost:3000/doctors", doctorData, options)
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
