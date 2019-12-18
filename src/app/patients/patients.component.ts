import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { Ipatient } from '../prototypes/patientprototype';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  providers:[PatientsService]
})
export class PatientsComponent implements OnInit, OnDestroy {

  patients:Ipatient[];
  dtOptions:DataTables.Settings = {};;
  dtTrigger:Subject<any> = new Subject(); 
  constructor(private _patientsService:PatientsService,) { 
	this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnInit() {
	this._patientsService.getPatients().subscribe((data) => { 
		this.patients = data;
		this.dtTrigger.next();
	});
  }
  ngOnDestroy(){
	this.dtTrigger.unsubscribe();
  }
}
