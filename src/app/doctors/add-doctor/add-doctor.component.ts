import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorsService } from '../../services/doctors.service';
import { DepartmentsService } from '../../services/departments.service';
import { Idoctor } from '../../prototypes/doctorprototype';
import { Idepartment } from '../../prototypes/departmentprototype';
import {Router} from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  doctor:Idoctor;
  departments:Idepartment[];
  constructor(private _doctorService:DoctorsService, private router:Router, public sweetAlertService: SweetAlertService, private _departments:DepartmentsService) { 
	this._departments.getDepartments().subscribe((data) => { this.departments = data; });
  }

  ngOnInit() {
  }
  onSubmit(doctor:Idoctor){
    let  response = this._doctorService.saveDoctor(doctor).subscribe(
      (data) => {
		this.sweetAlertService.showAlert('success', 'Doctor created successfully.', 'Done!');
        this.router.navigate(['/doctors']);
      },
      (error:any) => {
        console.log(error)
      }
    );
  }

}
