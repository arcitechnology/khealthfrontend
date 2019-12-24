import { Component, OnInit } from '@angular/core';
import { WeeksService } from '../../services/weeks.service';
import { Iweek } from '../../prototypes/weekprototype';
import { Subject } from 'rxjs';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-edit-doctors-timetable',
  templateUrl: './edit-doctors-timetable.component.html',
  styleUrls: ['./edit-doctors-timetable.component.css']
})
export class EditDoctorsTimetableComponent implements OnInit {

  weeks: Iweek[] = [];
  availabilityData: any = [];
  TimeSlots = [];
  hospitals = [];
  doctors = [];
  selDoctor = '';
  selHosp = '';
  constructor(private _weeks: WeeksService, public sweetAlertService: SweetAlertService) {
    this._weeks.getWeeks().subscribe((data: any) => {
      this.weeks = data.weeks;
      this.hospitals = data.hospitals;
      this.doctors = data.doctors;
      this.weeks.map((week: any, index: number) => {
        const availDt = {
          week_id: week.id,
          week_name: week.week_name,
          hospital_id: '',
          doctor_id: '',
          available: 0,
          from_time: "00:00",
          to_time: '00:00'
        }
        this.availabilityData.push(availDt);
      })
    });
  }

  ngOnInit() {
    this.generateTomeslots();
  }

  getTimingsByIds() {
    if (this.selDoctor != '' && this.selHosp != '') {
      // alert(this.selDoctor + ' ' + this.selHosp);
      this._weeks.getTimingsByIds(this.selHosp, this.selDoctor).subscribe((response) => {
        // console.log('response', response);


        this.availabilityData.map((arr, indx) => {
          for (let i = 0; i < response.length; i++) {
            if (arr.week_id == response[i].week_id) {
              arr.from_time = response[i].from_time;
              arr.to_time = response[i].to_time;
              arr.available = response[i].available;
              arr.hospital_id = response[i].hospital_id;
              arr.doctor_id = response[i].doctor_id;
            }
          }
        })

      });

    }

  }

  generateTomeslots() {
    var quarterHours = ["00", "15", "30", "45"];
    var times = [];
    for (var i = 0; i < 24; i++) {
      for (var j = 0; j < 4; j++) {
        let pi = (i < 10) ? '0' + i : i
        times.push({ key: pi + ":" + quarterHours[j], value: pi + ":" + quarterHours[j] });
      }
    }
    this.TimeSlots = times;


  }

  saveTimeSlots() {
    const availData = JSON.parse(JSON.stringify(this.availabilityData));

    availData.map(data => {
      data.available = (data.available) ? 1 : 0;
      delete (data.week_name);
    })

    const payload = { departments: availData }
    this._weeks.updateTimeSlots(payload).subscribe(response => {
      this.sweetAlertService.showAlert('success', 'Timetable Updated successfully.', 'Done!');

    }, error => {

    });
  }

}
