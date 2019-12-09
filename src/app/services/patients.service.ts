import { Injectable } from '@angular/core';
import { Ipatient } from '../prototypes/patientprototype';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private _http:Http) { }

  getPatients():Observable <Ipatient[]>{
        return this._http.get('http://localhost:3000/patients').map((response:Response) => <Ipatient[]> response.json())
        .catch(this.handleError);
    }
    
    handleError(error:Response){
        return Observable.throw(error);
    }
}
