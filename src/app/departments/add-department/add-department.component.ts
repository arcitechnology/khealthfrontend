import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Idepartment } from '../../prototypes/departmentprototype';
import { DepartmentsService } from '../../services/departments.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  department:Idepartment;
  submitted = false;
  public departmentForm: FormGroup;
  public departmentId: string = ''; 
  constructor(private _departmentService:DepartmentsService, private router:Router, private formBuilder: FormBuilder,
    private route: ActivatedRoute, public sweetAlertService: SweetAlertService){
	}

  ngOnInit() {
	// form validations
	this.departmentForm = this.formBuilder.group({
      department_name: ['', Validators.required],
      description: ['', Validators.required]
    });
	// to set the data into form if edit page else add page
	this.route.paramMap.subscribe(params => {
      this.departmentId = params.get('id');
      if (this.departmentId) {
        this._departmentService.getDepartmentDetails(this.departmentId).subscribe((data: any) => {
          if (data.length) {
            this.department = data[0];            
            this.departmentForm = this.formBuilder.group({
				department_name: [this.department.department_name, Validators.required],
				description: [this.department.description, Validators.required]
            });
          } else {
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
	get f() { return this.departmentForm.controls; }
	onSubmit(department:Idepartment){
		this.submitted = true;
		if (this.departmentForm.invalid) {
		  return;
		}
		const departmentData = {
		  department_name: this.f.department_name.value,
		  description: this.f.description.value
		}
		if (this.departmentId && this.departmentId != '') {
			this._departmentService.updateDepartment(departmentData, this.departmentId).subscribe(
			(data) => {
			  this.sweetAlertService.showAlert('success', 'Department updated successfully.', 'Done!');
			  this.router.navigate(['/departments']);
			},
			(error: any) => {
			  this.sweetAlertService.showAlert('failed', 'something went wrong', 'Failed!');
			}
			);
		}else{
			this._departmentService.saveDepartment(departmentData).subscribe(
			  (data) => {
				this.sweetAlertService.showAlert('success', 'Department added successfully.', 'Done!');
				this.router.navigate(['/departments']);
			  },
			  (error:any) => {
				this.sweetAlertService.showAlert('failed', 'something went wrong', 'Failed!');
			  }
			);
		}		
	}

}
