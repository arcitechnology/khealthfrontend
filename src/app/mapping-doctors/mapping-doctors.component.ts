import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WeeksService } from '../services/weeks.service';
import { SweetAlertService } from '../services/sweet-alert/sweet-alert.service';
@Component({
  selector: 'app-mapping-doctors',
  templateUrl: './mapping-doctors.component.html',
  styleUrls: ['./mapping-doctors.component.css']
})
export class MappingDoctorsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  hospitals: any = [];
  doctors: any = [];
  activeStatus: boolean = false;
  selDoctor = '';
  selHosp = '';
  error = false;
  mappedDataByHosp = [];

  constructor(private _weeks: WeeksService, public sweetAlertService: SweetAlertService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnInit() {
    this._weeks.getWeeks().subscribe((data: any) => {
      this.hospitals = data.hospitals;
      this.doctors = data.doctors;
      console.log(data.hospitals, 'data');
    });


  }

  saveMapping() {

    if (this.selDoctor == '' && this.selHosp == '') {
      this.error = true;
      return;
    }
    const mapping = {
      doctor_id: this.selDoctor,
      hospital_id: this.selHosp,
      active: (this.activeStatus) ? 1 : 0
    }

    this._weeks.saveMapping(mapping).subscribe((response: any) => {
      this.sweetAlertService.showAlert('success', 'Doctor Mapping added successfully.', 'Done!');
      this.selHosp = '';
      this.selDoctor = '';
      this.activeStatus = false;
      this.error = false;
    }, error => {
      this.selHosp = '';
      this.selDoctor = '';
      this.activeStatus = false;
      this.error = false;
    })
    // http://18.225.7.206:3000/slotsWeeks
  }

  getMappingsByHospitalId() {
    this._weeks.getMappingsById(this.selHosp).subscribe((data: any) => {
      this.mappedDataByHosp = data.result;
      // console.log(data, 'tst');
    });
  }

  updateMapStatus(hosp_id, doctor_id, status) {
    const mapping = {
      doctor_id: doctor_id,
      hospital_id: hosp_id,
      active: (status) ? 1 : 0
    }
    this._weeks.updateMapStatus(mapping).subscribe((response: any) => {
      this.sweetAlertService.showAlert('success', 'Doctor Mapping updated successfully.', 'Done!');

    }, error => {

    })
  }
}
