import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorsService } from '../../services/doctors.service';
import { DepartmentsService } from '../../services/departments.service';
import { Idoctor } from '../../prototypes/doctorprototype';
import { Idepartment } from '../../prototypes/departmentprototype';
import { Router, ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  doctor: Idoctor;
  departments: any;
  selectedDepArray: Array<any> = [];
  public doctorForm: FormGroup;
  submitted = false;
  public doctorId: string = '';
  public formTitle = 'ADD DOCTOR';

  constructor(private _doctorService: DoctorsService, private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public sweetAlertService: SweetAlertService, private _departments: DepartmentsService) {
    this._departments.getDepartments().subscribe((data) => { this.departments = data; });
  }

  ngOnInit() {

    this.doctorForm = this.formBuilder.group({
      doctor_name: ['', [Validators.required]],
      qualification: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      // phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      active_status: ['']
    });

    this.route.paramMap.subscribe(params => {
      this.doctorId = params.get('id');
      if (this.doctorId) {
        this._doctorService.getDoctorDetails(this.doctorId).subscribe((data: any) => {
          if (data.doctor.length) {
            this.doctor = data.doctor[0];
            let dd = data.departments;
            this.setSelectedDepartments(dd);
            this.doctorForm = this.formBuilder.group({
              doctor_name: [this.doctor.doctor_name, [Validators.required]],
              qualification: [this.doctor.qualification, Validators.required],
              mobile: [this.doctor.mobile, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
              // phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
              active_status: [this.doctor.active_status]
            });
          } else {
            console.log('doctor not found');
          }
        },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });

  }

  get f() { return this.doctorForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.doctorForm.invalid) {
      return;
    }
    const doctorData = {
      doctor_name: this.f.doctor_name.value,
      qualification: this.f.qualification.value,
      mobile: this.f.mobile.value,
      // phone: this.f.phone.value,
      active_status: this.f.active_status.value
    }
    const payload = { doctor: doctorData, departments: this.selectedDepArray };
    // console.log(payload);

    if (this.doctorId && this.doctorId != '') {
      this._doctorService.updateDoctor(payload, this.doctorId).subscribe(
        (data) => {
          this.sweetAlertService.showAlert('success', 'Doctor updated successfully.', 'Done!');
          this.router.navigate(['/doctors']);
        },
        (error: any) => {
          console.log(error)
        }
      );
    } else {
      this._doctorService.saveDoctor(payload).subscribe(
        (data) => {
          this.sweetAlertService.showAlert('success', 'Doctor registered successfully.', 'Done!');
          this.router.navigate(['/doctors']);
        },
        (error: any) => {
          console.log(error)
        }
      );
    }

  }

  departmentChange(index: number, isChecked: boolean) {
    this.departments[index].isChecked = isChecked;
    this.getSelectedDepartments();
  }

  getSelectedDepartments() {
    this.selectedDepArray = this.departments.filter((department: any, index: any) => {
      return department.isChecked
    }).map((department: any) => {
      return department.id;
    });
    console.log(this.selectedDepArray);
  }

  setSelectedDepartments(selDepartments: any) {
    if (selDepartments.length) {
      for (let i = 0; i < selDepartments.length; i++) {
        this.departments.map((dept: any, index: number) => {
          if (dept.id == selDepartments[i].department_id) {
            return dept.isChecked = true;
          }
        })
      }
    }

    this.getSelectedDepartments();

    console.log(this.departments);
  }

}
