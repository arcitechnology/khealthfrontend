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
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {

  doctor:Idoctor;
  departments:any;
  selectedDepArray: Array<any> = [];
  constructor(private _doctorService:DoctorsService, private router:Router, public sweetAlertService: SweetAlertService, private _departments:DepartmentsService) { 
	this._departments.getDepartments().subscribe((data) => { this.departments = data; });
  }

  ngOnInit() {
  }

}
