import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalsService } from '../../services/hospital.service';
import { Ihospital } from '../../prototypes/hospitalprototype';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {

  hospital:Ihospital;
  constructor(private _hospitalService:HospitalsService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit(hospital:Ihospital){
    this.hospital.hospital_latitude = '81.254698';
    this.hospital.hospital_longitude = '32.145879';
    console.log(hospital);
    let  response = this._hospitalService.saveHospital(hospital).subscribe(
      (data) => {
        this.router.navigate(['/hospitals']);
      },
      (error:any) => {
        console.log(error)
      }
    );
  }

}
