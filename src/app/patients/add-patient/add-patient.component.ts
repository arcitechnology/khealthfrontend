import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PatientsService } from '../../services/patients.service';
import { HospitalsService } from '../../services/hospital.service';
import { Ipatient } from '../../prototypes/patientprototype';
import { Router } from '@angular/router';
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
  public locality: string;
  public selLat: string = "16.9534615";
  public selLong: string = "82.2345535";
  public mapURL = "https://maps.locationiq.com/v2/staticmap?key=fc4bcb513ab2b6&center=" + this.selLat + "," + this.selLong + "&zoom=10&size=400x300&markers=" + this.selLat + "," + this.selLong + "";

  constructor(private _hospitalService: HospitalsService, private _patientService: PatientsService, private router: Router, public sweetAlertService: SweetAlertService) {
  }

  ngOnInit() {
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

  /*onChange(dep: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedDepArray.push(dep);
    } else {
      let index = this.selectedDepArray.indexOf(dep);
      this.selectedDepArray.splice(index, 1);
    }
  }*/

  getLatLan() {
    this._hospitalService.getGeocode(this.locality).subscribe((response: any) => {
      console.log('latlong', response[0]);
      this.selLat = response[0].lat;
      this.selLong = response[0].lon;
      this.mapURL = "https://maps.locationiq.com/v2/staticmap?key=fc4bcb513ab2b6&center=" + this.selLat + "," + this.selLong + "&zoom=8&size=400x300&markers=" + this.selLat + "," + this.selLong + "";
      // this.initMap();
    });
  }

  onSubmit(patient: Ipatient) {
    patient.latitude = this.selLat;
    patient.longitude = this.selLong;
	patient.avail_ambulance = patient.avail_ambulance ? '1':'0';
    let response = this._patientService.savePatient(patient).subscribe(
      (data) => {
        this.sweetAlertService.showAlert('success', 'Patient registered successfully.', 'Done!');
        this.router.navigate(['/patients']);
      },
      (error: any) => {
        this.sweetAlertService.showAlert('error', 'Error while registering patient.', 'Error!');
      }
    );
  }
}
