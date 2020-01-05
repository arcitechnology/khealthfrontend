import { Injectable } from '@angular/core';
import { Ipatient } from '../prototypes/patientprototype';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PatientsService {
    _patient: Ipatient[];
    constructor(private _http: Http) { }

    getPatients(): Observable<Ipatient[]> {
        return this._http.get(environment.apiUrl + 'patients').map((response: Response) => <Ipatient[]>response.json())
            .catch(this.handleError);
    }

    getPatientDetails(id: any): Observable<Ipatient[]> {
        return this._http.get(environment.apiUrl + 'patients/' + id).map((response: Response) => <Ipatient[]>response.json())
            .catch(this.handleError);
    }

    savePatient(patientData: any): Observable<Ipatient> {
        console.log(patientData);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(environment.apiUrl + 'patients', patientData, options).map(this.extractData).catch(this.handleError);
    }

    updatePatient(patientData: any, patientId: any): Observable<Ipatient> {
        console.log(patientData);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(environment.apiUrl + 'patients/' + patientId, patientData, options).map(this.extractData).catch(this.handleError);
    }



    handleError(error: Response) {
        return Observable.throw(error);
    }

    extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
