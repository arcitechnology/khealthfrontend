import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorsService } from '../services/doctors.service';
import { Idoctor } from '../prototypes/doctorprototype';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
  providers:[DoctorsService]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  doctors:Idoctor[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  constructor(private _doctorService: DoctorsService) {
	this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }
  ngOnInit() {
	this._doctorService.getDoctors().subscribe((data) => { 
      this.doctors = data;
	  this.dtTrigger.next();    
    });
  }
  
  ngOnDestroy(){
	this.dtTrigger.unsubscribe();
  }
}
