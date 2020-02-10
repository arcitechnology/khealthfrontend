import { Injectable } from '@angular/core';
import { Iweek } from '../prototypes/weekprototype';
import { Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeeksService {

  _weeks: Iweek[];
  doctimings: Iweek[];
  constructor(private http: HttpClient) {
  }

  getWeeks(): Observable<Iweek[]> {

    return this.http.get(environment.apiUrl + 'slotsWeeks').pipe(map((weeks: Iweek[]) => {
      return weeks;
    }));

  }

  getMappingsById(hospId): Observable<any[]> {
    return this.http.get(environment.apiUrl + 'hospitaldoctors/' + hospId).pipe(map((mappings: any[]) => {
      return mappings;
    }));

  }

  saveMapping(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'hospitaldoctors', payload).pipe(map((hosp: any) => {
      return hosp;
    }));
  }

  updateMapStatus(payload: any): Observable<any> {
    return this.http.put(environment.apiUrl + 'updateHospDoctorStatus', payload).pipe(map((hosp: any) => {
      return hosp;
    }));
  }

  getDoctorsTimings(): Observable<any[]> {
    return this.http.get(environment.apiUrl + 'doctortimings').pipe(map((doctimings: Iweek[]) => {
      return doctimings;
    }));
  }

  getTimingsByIds(hospId: any, docId: any): Observable<any[]> {

    return this.http.get(environment.apiUrl + 'doctortimings/' + hospId + '/' + docId).pipe(map((weeks: Iweek[]) => {
      return weeks;
    }));

  }

  saveTimeSlots(payload: any): Observable<any> {
    //const payload ={departments:this. }
    return this.http.post(environment.apiUrl + 'doctortimings', payload).pipe(map((hosp: any) => {
      return hosp;
    }));
  }


  updateTimeSlots(payload: any): Observable<any> {
    //const payload ={departments:this. }
    return this.http.put(environment.apiUrl + 'doctortimings', payload).pipe(map((hosp: any) => {
      return hosp;
    }));
  }
  handleError(error: Response) {
    return Observable.throw(error);
  }
}
