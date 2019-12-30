import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HospitalsService } from '../../services/hospital.service';
import { Ihospital } from '../../prototypes/hospitalprototype';

@Component({
  selector: 'app-view-hospital',
  templateUrl: './view-hospital.component.html',
  styleUrls: ['./view-hospital.component.css']
})
export class ViewHospitalComponent implements OnInit {

  hospital:Ihospital;
  hospitalId:string = '';
  departments: any;
  constructor(private _hospitalService:HospitalsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.paramMap.subscribe(params => {
		this.hospitalId = params.get('id');
		if (this.hospitalId) {
			this._hospitalService.getHospitalById(this.hospitalId).subscribe((data:any) => {
					if(data.hospital.length){
						this.hospital = data.hospital[0];
						console.log('hosp', this.hospital);
						this.departments =data.departments;
					}else{
						console.log('hospital not found');
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
