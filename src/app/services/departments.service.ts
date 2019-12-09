import { Injectable } from '@angular/core';
import { Idepartment } from '../prototypes/departmentprototype';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DepartmentsService {

  _departments:Idepartment[];

  constructor(private _http:Http) {       
  }

  getDepartments():Observable <Idepartment[]>{
        return this._http.get('http://localhost:3000/departments').map((response:Response) => <Idepartment[]> response.json())
        .catch(this.handleError);
    }
    
    handleError(error:Response){
        return Observable.throw(error);
    }

    saveDepartment(department:Idepartment):Observable<Idepartment>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post("http://localhost:3000/departments", department, options)
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
