import { Component, OnInit, Input } from '@angular/core';
import { Ipatient } from '../../prototypes/patientprototype';
import { PatientsService } from '../../services/patients.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patientdata',
  templateUrl: './patientdata.component.html',
  styleUrls: ['./patientdata.component.css']
})
export class PatientdataComponent implements OnInit {
  @Input() cur_patient:Ipatient;
  hospitals:any[] = [];
  sms_text:string = "";
  show_hospitals:boolean = false;
  constructor(private _patientsService:PatientsService) {  
  }

  ngOnInit() {
  }
  getHospitalList(uniq_code:string){
	this._patientsService.getNearestHospitalsList(uniq_code).subscribe((data:any) => {
		this.hospitals = data.message;
		this.show_hospitals = true;
	});
  }

  showMessage(){
	this.sms_text = "Please integrate SMS gateway to send messages";
  }
}
