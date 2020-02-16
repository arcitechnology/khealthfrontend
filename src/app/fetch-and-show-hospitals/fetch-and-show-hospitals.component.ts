import { Component, OnInit, Output, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../services/patients.service';
import { Ipatient } from '../prototypes/patientprototype';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-fetch-and-show-hospitals',
  templateUrl: './fetch-and-show-hospitals.component.html',
  styleUrls: ['./fetch-and-show-hospitals.component.css']
})
export class FetchAndShowHospitalsComponent implements OnInit {
  patient: Ipatient;
  patientId: string = '';
  constructor(private _patientService: PatientsService, private router: Router, private route: ActivatedRoute,private formBuilder: FormBuilder) { 
  }
  public fetchHospitalsForm: FormGroup;
  public submitted = false;
  
  ngOnInit() {
	this.fetchHospitalsForm = this.formBuilder.group({
		  patient_unique_id: ['', [Validators.required]],
	});
  }
  
  get f() { return this.fetchHospitalsForm.controls; }
  
  onSubmit(){
	this.submitted = true;
	if(this.fetchHospitalsForm.invalid) {
        return;
    }else{
		var patientId = this.fetchHospitalsForm.value.patient_unique_id;
		if (patientId) {
			this._patientService.getPatientByCode(patientId).subscribe((data:any) => {
					if(data.length){
						this.patient = data[0];
					}else{
						console.log('patient not found');
					}				
				},
				(error: any) => {
					console.log(error);
				}
			);
        }
	}
  }

}
