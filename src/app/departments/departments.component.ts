import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentsService } from '../services/departments.service';
import { Idepartment } from '../prototypes/departmentprototype';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers:[DepartmentsService]
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  departments:Idepartment[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private  _departmentService:DepartmentsService) { 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnInit() {
	this._departmentService.getDepartments().subscribe((data) => { 
		this.departments = data;
		this.dtTrigger.next();
	});
  }
  
  ngOnDestroy(){
	this.dtTrigger.unsubscribe();
  }

}
