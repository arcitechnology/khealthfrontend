import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { Ipatient } from '../../prototypes/patientprototype';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  patient: Ipatient;
  patientId: string = '';
  constructor(private _patientService: PatientsService, private router: Router, private route: ActivatedRoute) { 
	
  }

  ngOnInit() {
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
