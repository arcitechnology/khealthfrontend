import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorsService } from '../../services/doctors.service';
import { Idoctor } from '../../prototypes/doctorprototype';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  doctor:Idoctor;
  constructor(private _doctorService:DoctorsService, private router:Router) { 
  }

  ngOnInit() {
  }
  onSubmit(doctor:Idoctor){
    let  response = this._doctorService.saveDoctor(doctor).subscribe(
      (data) => {
        this.router.navigate(['/doctors']);
      },
      (error:any) => {
        console.log(error)
      }
    );
  }

}
