import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-update-department-child',
  templateUrl: './update-department-child.component.html',
  styleUrls: ['./update-department-child.component.css']
})
export class UpdateDepartmentChildComponent implements OnInit {
	@Input() frmdata:any;
	departForm: FormGroup;
	submitted = false;

    constructor(private formBuilder: FormBuilder,private _admin: AdminService,private sweetAlertService: SweetAlertService) { }

    ngOnInit() {
	console.log(this.frmdata);
        this.departForm = this.formBuilder.group({
            hospital_name: ['', Validators.required],
            hospital_id: [''],
            department: ['', Validators.required],
            from_time: ['', Validators.required],
            to_time: ['', Validators.required],
            available:[''],
        });
		
		this.departForm.setValue({
			hospital_name:this.frmdata.hospital.hospital_name,
			hospital_id:this.frmdata.hospital.hospital_id,
			department:'',
			from_time:'',
			to_time:'',
			available:''	
		});
    }
	
	get f() { return this.departForm.controls; }
	onsubmit() {
        this.submitted = true;
        if (this.departForm.invalid) {
            return;
        }
		console.log(this.departForm);
		const availData = {
			hospital_id:this.departForm.value.hospital_id,
			department_id:this.departForm.value.department,
			from_time:this.departForm.value.from_time,
			to_time:this.departForm.value.to_time,
			available:this.departForm.value.available?1:0,
		};
		this._admin.saveAvailDepart(availData).subscribe(
			(data) => {
			  this.sweetAlertService.showAlert('success', 'Updated successfully.', 'Done!');
			},
			(error: any) => {
			  this.sweetAlertService.showAlert('error', 'Error while updating...', 'Error!');
			}
      );
	}
}
