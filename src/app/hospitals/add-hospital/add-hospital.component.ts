import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalsService } from '../../services/hospital.service';
import { Ihospital } from '../../prototypes/hospitalprototype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {

  hospital: Ihospital;
  departments: any;
  selectedDepArray: Array<any> = [];
  ambulance_avail: boolean;
  constructor(private _hospitalService: HospitalsService, private router: Router) { }

  ngOnInit() {
    this._hospitalService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  onChange(email: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedDepArray.push(email);
    } else {
      let index = this.selectedDepArray.indexOf(email);
      this.selectedDepArray.splice(index, 1);
    }
    // console.log(this.selectedDepArray);
  }

  onSubmit(hospital: Ihospital) {
    console.log(hospital);
    hospital.hospital_latitude = '81.254698';
    hospital.hospital_longitude = '32.145879';
    hospital.departments = this.selectedDepArray;


    let response = this._hospitalService.saveHospital(hospital).subscribe(
      (data) => {
        this.router.navigate(['/hospitals']);
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

}
