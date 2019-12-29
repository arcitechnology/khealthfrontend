import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../../services/doctors.service';
import { Idoctor } from '../../prototypes/doctorprototype';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {

  doctor: Idoctor[];
  departments: any[];
  doctorId: string = '';
  constructor(private _doctorService:DoctorsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.paramMap.subscribe(params => {
		this.doctorId = params.get('id');
		if (this.doctorId) {
			this._doctorService.getDoctorDetails(this.doctorId).subscribe((data:any) => {
					if(data.doctor.length){
						this.doctor = data.doctor[0];
						this.departments =data.departments;
					}else{
						console.log('doctor not found');
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
