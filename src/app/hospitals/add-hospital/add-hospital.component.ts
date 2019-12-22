import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HospitalsService } from '../../services/hospital.service';
import { Ihospital } from '../../prototypes/hospitalprototype';

import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';


import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit, AfterViewInit {


  @ViewChild('gmap') gmapElement: any;


  hospital: Ihospital;
  departments: any;
  selectedDepArray: Array<any> = [];
  ambulance_avail: boolean;
  submitted = false;
  public locality: string;
  public hospitalId: string = '';
  public formTitle = 'HOSPITAL REGISTRATION FORM';
  public selLat: string = "18.5793";
  public selLong: string = "73.8143";
  public mapURL = "https://maps.locationiq.com/v2/staticmap?key=fc4bcb513ab2b6&center=" + this.selLat + "," + this.selLong + "&zoom=8&size=600x450&markers=" + this.selLat + "," + this.selLong + "";

  public hospitalForm: FormGroup;
  constructor(private _hospitalService: HospitalsService,
    private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, public sweetAlertService: SweetAlertService) {
  }

  ngOnInit() {

    this.hospitalForm = this.formBuilder.group({
      hospital_name: ['', [Validators.required]],
      hospital_address: ['', Validators.required],
      hospital_locality: ['', Validators.required],
      hospital_phone1: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      hospital_phone2: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      pro_name: ['', Validators.required],
      pro_mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      // ambulance_avail: ['']
    });

    this.route.paramMap.subscribe(params => {
      this.hospitalId = params.get('id');
      if (this.hospitalId) {

        this.formTitle = 'HOSPITAL EDIT FORM';

        this._hospitalService.getHospitalById(this.hospitalId).subscribe(
          (data: any) => {
            console.log('data-id', data);
            if (data && data.hospital && data.hospital.length) {
              const hosp = data.hospital[0];
              this.hospitalForm = this.formBuilder.group({
                hospital_name: [hosp.hospital_name, [Validators.required]],
                hospital_address: [hosp.hospital_address, Validators.required],
                hospital_locality: [hosp.hospital_locality, Validators.required],
                hospital_phone1: [hosp.hospital_phone1, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
                hospital_phone2: [hosp.hospital_phone2, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
                pro_name: [hosp.pro_name, Validators.required],
                pro_mobile: [hosp.pro_mobile, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
                //ambulance_avail: [hosp.ambulance_avail]
              });
              this.selLat = hosp.hospital_latitude;
              this.selLong = hosp.hospital_longitude;
              this.setMapUrl();
              // this.setSelectedDepartments(data.departments)

              const dd = data.departments;

              this._hospitalService.getDepartments().subscribe(
                (data) => {
                  this.departments = data;
                  this.setSelectedDepartments(dd);
                },
                (error: any) => {
                  console.log(error);
                }
              )
            }


          },
          (error: any) => {
            console.log(error);
          }
        )

      } else {
        this._hospitalService.getDepartments().subscribe(
          (data) => {
            this.departments = data;
          },
          (error: any) => {
            console.log(error);
          }
        )
      }

    });





  }

  get f() { return this.hospitalForm.controls; }

  ngAfterViewInit() {
    // this.initMap();
  }

  departmentChange(index: number, isChecked: boolean) {
    this.departments[index].isChecked = isChecked;
    this.getSelectedDepartments();
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

  getSelectedDepartments() {
    this.selectedDepArray = this.departments.filter((department: any, index) => {
      return department.isChecked
    }).map((department: any) => {
      return department.id;
    });
    console.log(this.selectedDepArray);
  }

  onChange(email: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedDepArray.push(email);
    } else {
      let index = this.selectedDepArray.indexOf(email);
      this.selectedDepArray.splice(index, 1);
    }
    console.log(this.selectedDepArray);
  }

  getLatLan(event: any) {
    // alert(this.f.hospital_locality.value);
    this._hospitalService.getGeocode(this.f.hospital_locality.value).subscribe((response: any) => {
      console.log('latlong', response[0]);
      this.selLat = response[0].lat;
      this.selLong = response[0].lon;
      this.setMapUrl();
      // this.initMap();
    });
  }

  setMapUrl() {
    this.mapURL = "https://maps.locationiq.com/v2/staticmap?key=fc4bcb513ab2b6&center=" + this.selLat + "," + this.selLong + "&zoom=8&size=600x450&markers=" + this.selLat + "," + this.selLong + "";
  }




  onSubmit = () => {
    this.submitted = true;
    if (this.hospitalForm.invalid) {
      return;
    }
    const hospital = {
      hospital_name: this.f.hospital_name.value,
      hospital_locality: this.f.hospital_locality.value,
      hospital_address: this.f.hospital_address.value,
      hospital_phone1: this.f.hospital_phone1.value,
      hospital_phone2: this.f.hospital_phone2.value,
      pro_name: this.f.pro_name.value,
      pro_mobile: this.f.pro_mobile.value,
      hospital_status: '1',
      // ambulance_avail: this.f.ambulance_avail.value,
      hospital_latitude: this.selLat,
      hospital_longitude: this.selLong
    }

    const payload = { hospital, departments: this.selectedDepArray };

    console.log(this.selectedDepArray);

    // return false;

    if (this.hospitalId) {

      let response = this._hospitalService.updateHospital(payload, this.hospitalId).subscribe(
        (data) => {
          this.sweetAlertService.showAlert('success', 'Hospital Updated successfully.', 'Done!');
          this.router.navigate(['/hospitals']);
        },
        (error: any) => {
          console.log(error)
        }
      );
    } else {
      let response = this._hospitalService.saveHospital(payload).subscribe(
        (data) => {
          this.sweetAlertService.showAlert('success', 'Hospital created successfully.', 'Done!');
          this.router.navigate(['/hospitals']);
        },
        (error: any) => {
          console.log(error)
        }
      );
    }

    // console.log(payload);


  }

}
