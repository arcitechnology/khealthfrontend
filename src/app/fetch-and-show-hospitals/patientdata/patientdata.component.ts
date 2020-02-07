import { Component, OnInit, Input } from '@angular/core';
import { Ipatient } from '../../prototypes/patientprototype';

@Component({
  selector: 'app-patientdata',
  templateUrl: './patientdata.component.html',
  styleUrls: ['./patientdata.component.css']
})
export class PatientdataComponent implements OnInit {
  @Input() cur_patient:Ipatient;
  constructor() { }

  ngOnInit() {
  }
  getHospitalList(){
	console.log('hello');
  }

}
