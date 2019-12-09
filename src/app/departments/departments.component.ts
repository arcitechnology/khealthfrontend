import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../services/departments.service';
import { Idepartment } from '../prototypes/departmentprototype';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers:[DepartmentsService]
})
export class DepartmentsComponent implements OnInit {

  departments:Idepartment[];
  constructor(private  _departmentService:DepartmentsService) { 
    this._departmentService.getDepartments().subscribe((data) => { this.departments = data; });
  }

  ngOnInit() {
  }

}
