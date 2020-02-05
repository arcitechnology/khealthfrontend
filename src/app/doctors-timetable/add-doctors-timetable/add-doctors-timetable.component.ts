import { Component, OnInit } from '@angular/core';
import { WeeksService } from '../../services/weeks.service';
import { Iweek } from '../../prototypes/weekprototype';
import { Subject } from 'rxjs';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-doctors-timetable',
  templateUrl: './add-doctors-timetable.component.html',
  styleUrls: ['./add-doctors-timetable.component.css'],
  providers: [WeeksService]
})
export class AddDoctorsTimetableComponent implements OnInit {

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
          slots: [{
            available: 0,
            from_time: "00:00",
            to_time: '00:00'
          }, {
            available: 0,
            from_time: "00:00",
            to_time: '00:00'
          }]
        }
        this.availabilityData.push(availDt);
      })
    });
  }

  ngOnInit() {
    this.generateTomeslots();
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

  addMoreSlots(index) {
    // alert(index);
    const slot = {
      available: 0,
      from_time: "00:00",
      to_time: '00:00'
    }
    this.availabilityData[index].slots.push(slot);
    console.log(this.availabilityData);
  }

  saveTimeSlots() {
    console.log('test', this.availabilityData);

    const availData = JSON.parse(JSON.stringify(this.availabilityData));

    availData.map(data => {
      data.hospital_id = this.selHosp;
      data.doctor_id = this.selDoctor;
      // data.available = (data.available) ? 1 : 0;
      data.slots.map(slot => {
        slot.available = (slot.available) ? 1 : 0;
      })
      delete (data.week_name);

    })

    console.log(availData, 'availData');

    const payload = { departments: availData }
    this._weeks.saveTimeSlots(payload).subscribe(response => {
      this.sweetAlertService.showAlert('success', 'Timetable Added successfully.', 'Done!');

    }, error => {

    });
  }

}
