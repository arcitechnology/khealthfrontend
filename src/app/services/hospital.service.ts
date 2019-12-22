import { Injectable } from '@angular/core';
import { Ihospital } from '../prototypes/hospitalprototype';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HospitalsService {
    _hospital: Ihospital[];
    constructor(private _http: Http, private http: HttpClient) {
    }

    getHospitals(): Observable<Ihospital[]> {
        return this.http.get(environment.apiUrl + 'hospitals').pipe(map((hospitals: Ihospital[]) => {
            return hospitals;
        }));

    }

    getHospitalById(id: any): Observable<Ihospital> {
        return this.http.get(environment.apiUrl + 'hospitals/' + id).pipe(map((hospital: Ihospital) => {
            return hospital;
        }));
    }


    handleError(error: Response) {
        return Observable.throw(error);
    }

    getDepartments() {
        return this._http.get(environment.apiUrl + "departments")
            .map(this.extractData)
            .catch(this.handleErrorObservable);



    }

    saveHospital(hospitalData: any): Observable<Ihospital> {
        return this.http.post(environment.apiUrl + "hospitals", hospitalData).pipe(map((hosp: Ihospital) => {
            return hosp;
        }));
    }

    getGeocode(locality){
		return this._http.get( "https://us1.locationiq.com/v1/search.php?key=fc4bcb513ab2b6&q="+locality+"&format=json").map(this.extractData).catch(this.handleErrorObservable);;
     }
	 
    updateHospital(hospitalData: any, id): Observable<Ihospital> {
        return this.http.put(environment.apiUrl + "hospitals/" + id, hospitalData).pipe(map((hosp: Ihospital) => {
            return hosp;
        }));


    }

    extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}
