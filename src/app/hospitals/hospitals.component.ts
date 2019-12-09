import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../services/hospital.service';
import { Ihospital } from '../prototypes/hospitalprototype';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
  providers:[HospitalsService]
})
export class HospitalsComponent implements OnInit {

  hospitals:Ihospital[];
  constructor(private _hospitalService:HospitalsService) { 
    this._hospitalService.getHospitals().subscribe((data) => { this.hospitals = data; });
  }

  ngOnInit() {
  }

}
