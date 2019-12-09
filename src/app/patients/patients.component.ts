import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { Ipatient } from '../prototypes/patientprototype';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  providers:[PatientsService]
})
export class PatientsComponent implements OnInit {

  patients:Ipatient[];
  constructor(private _patientsService:PatientsService) { 
    this._patientsService.getPatients().subscribe((data) => { this.patients = data; });
  }

  ngOnInit() {
  }

}
