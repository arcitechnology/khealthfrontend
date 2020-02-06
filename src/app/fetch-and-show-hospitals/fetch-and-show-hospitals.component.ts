import { Component, OnInit, Output, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../services/patients.service';
import { Ipatient } from '../prototypes/patientprototype';
import { Router, ActivatedRoute } from '@angular/router';

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
	this.route.paramMap.subscribe(params => {
		this.patientId = params.get('id');
		if (this.patientId) {
			this._patientService.getPatientDetails(this.patientId).subscribe((data:any) => {
					if(data.length){
						this.patient = data[0];
						console.log(this.patient);
					}else{
						console.log('patient not found');
					}				
				},
				(error: any) => {
					console.log(error);
				}
			);
        }
	});
  }

}
