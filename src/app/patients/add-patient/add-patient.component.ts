import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../../services/patients.service';
import { HospitalsService } from '../../services/hospital.service';
import { Ipatient } from '../../prototypes/patientprototype';
import { Router, ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { ViewChild } from '@angular/core';

var geocoder: any;
var map: any;

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit, AfterViewInit {

  @ViewChild('gmap') gmapElement: any;
  //map: google.maps.Map;

  patient: Ipatient;
  departments: any;
  //selectedDepArray: Array<any> = [];
  public formTitle = 'PATIENT REGISTRATION FORM';
  public locality: string;
  amb_avail = false;
  public selLat: string = "16.9534615";
  public selLong: string = "82.2345535";
  public mapURL = "https://maps.locationiq.com/v2/staticmap?key=fc4bcb513ab2b6&center=" + this.selLat + "," + this.selLong + "&zoom=10&size=400x300&markers=" + this.selLat + "," + this.selLong + "";

  public patientForm: FormGroup;
  public submitted = false;
  public patientId: string = '';
  constructor(private _hospitalService: HospitalsService,
    private _patientService: PatientsService,
    private router: Router, public sweetAlertService: SweetAlertService,
    private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

    this.patientForm = this.formBuilder.group({
      patient_name: ['', [Validators.required]],
      helper_name: ['', [Validators.required]],
      address: ['', Validators.required],
      locality: ['', Validators.required],
      helper_mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      patient_mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      problem_description: ['', Validators.required],
      department: ['', Validators.required],
      avail_ambulance: [''],
    });
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('id');
      if (this.patientId) {
        this.formTitle = 'PATIENT EDIT FORM';
        this._patientService.getPatientDetails(this.patientId).subscribe((data: any) => {
          if (data.length) {
            this.patient = data[0];
            console.log(this.patient);
            this.patientForm = this.formBuilder.group({
              patient_name: [this.patient.patient_name, [Validators.required]],
              helper_name: [this.patient.helper_name, [Validators.required]],
              address: [this.patient.address, Validators.required],
              locality: [this.patient.locality, Validators.required],
              helper_mobile: [this.patient.helper_mobile, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
              patient_mobile: [this.patient.patient_mobile, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
              problem_description: [this.patient.problem_description, Validators.required],
              department: [this.patient.department, Validators.required],
              avail_ambulance: [this.patient.avail_ambulance],
              
            });
            this.selLat = this.patient.latitude;
            this.selLong = this.patient.longitude;
            this.setMapUrl();
          } else {
            console.log('patient not found');
          }
        },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });


    this._hospitalService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  ngAfterViewInit() {
    // this.initMap();
  }

  get f() { return this.patientForm.controls; }

  getLatLan() {
    this._hospitalService.getGeocode(this.locality).subscribe((response: any) => {
      console.log('latlong', response[0]);
      this.selLat = response[0].lat;
      this.selLong = response[0].lon;
      this.setMapUrl();
      //this.mapURL = "https://maps.locationiq.com/v2/staticmap?key=fc4bcb513ab2b6&center=" + this.selLat + "," + this.selLong + "&zoom=8&size=400x300&markers=" + this.selLat + "," + this.selLong + "";
      // this.initMap();
    });
  }

  setMapUrl() {
    this.mapURL = "https://maps.locationiq.com/v2/staticmap?key=fc4bcb513ab2b6&center=" + this.selLat + "," + this.selLong + "&zoom=8&size=400x300&markers=" + this.selLat + "," + this.selLong + "";
  }
  toggleChkBox(e) {
    this.amb_avail = e.target.checked;
    console.log(this.amb_avail);
  }
  onSubmit() {
    this.submitted = true;
    if (this.patientForm.invalid) {
      return;
    }

    const patientData = {
      patient_name: this.f.patient_name.value,
      helper_name: this.f.helper_name.value,
      helper_mobile: this.f.helper_mobile.value,
      patient_mobile: this.f.patient_mobile.value,
      address: this.f.address.value,
      locality: this.f.locality.value,
      problem_description: this.f.problem_description.value,
      department: this.f.department.value + '',
      avail_ambulance: this.f.avail_ambulance.value ? 1 : 0,
      latitude: this.selLat,
      longitude: this.selLong
    }
    //  console.log('patientData',patientData);
    if (this.patientId) {
      this._patientService.updatePatient(patientData, this.patientId).subscribe(
        (data) => {
          this.sweetAlertService.showAlert('success', 'Patient updated successfully.', 'Done!');
          this.router.navigate(['/patients']);
        },
        (error: any) => {
          // this.sweetAlertService.showAlert('error', 'Error while registering patient.', 'Error!');
        }
      );

    } else {
      this._patientService.savePatient(patientData).subscribe(
        (data) => {
          this.sweetAlertService.showAlert('success', 'Patient registered successfully.', 'Done!');
          this.router.navigate(['/patients']);
        },
        (error: any) => {
          // this.sweetAlertService.showAlert('error', 'Error while registering patient.', 'Error!');
        }
      );
    }

  }
}
