import { Injectable } from '@angular/core';
import { Iweek } from '../prototypes/weekprototype';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class WeeksService {
	
  _weeks:Iweek[];
  constructor(private _http:Http) {       
  }
  
	getWeeks():Observable <Iweek[]>{
        return this._http.get('http://localhost:3000/slotsWeeks').map((response:Response) => <Iweek[]> response.json())
        .catch(this.handleError);
    }
    
    handleError(error:Response){
        return Observable.throw(error);
    }
}
