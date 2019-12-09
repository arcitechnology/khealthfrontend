import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../services/doctors.service';
import { Idoctor } from '../prototypes/doctorprototype';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
  providers:[DoctorsService]
})
export class DoctorsComponent implements OnInit {

  doctors:Idoctor[];
  constructor(private _doctorService: DoctorsService) { 
    this._doctorService.getDoctors().subscribe((data) => { this.doctors = data; });
  }
  ngOnInit() {
  }
}
