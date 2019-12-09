import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Idepartment } from '../../prototypes/departmentprototype';
import { DepartmentsService } from '../../services/departments.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  department:Idepartment;
  constructor(private _departmentService:DepartmentsService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit(department){
    console.log(department);
    let  response = this._departmentService.saveDepartment(department).subscribe(
      (data) => {
        this.router.navigate(['/departments']);
      },
      (error:any) => {
        console.log(error)
      }
    );
  }

}
