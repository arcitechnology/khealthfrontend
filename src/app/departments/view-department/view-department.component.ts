import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../services/departments.service';
import { Idepartment } from '../../prototypes/departmentprototype';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {

  department: Idepartment[];
  departmentId: string = '';
  constructor(private _departmentService:DepartmentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.paramMap.subscribe(params => {
		this.departmentId = params.get('id');
		if (this.departmentId) {
			this._departmentService.getDepartmentDetails(this.departmentId).subscribe((data:any) => {
					if(data.length){
						this.department = data[0];
						console.log(this.department);
					}else{
						console.log('department not found');
					}				
				},
				(error: any) => {
					console.log(error);
				}
			);
        }
	});
  }

}
