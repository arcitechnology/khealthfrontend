import { Component, OnInit } from '@angular/core';
import { WeeksService } from '../../services/weeks.service';
import { Iweek } from '../../prototypes/weekprototype';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-doctor-timetable',
  templateUrl: './view-doctor-timetable.component.html',
  styleUrls: ['./view-doctor-timetable.component.css']
})
export class ViewDoctorTimetableComponent implements OnInit {
  selDoctor: string = '';
  hospId: string = '';
  weeks: any = [];
  availabilityData: any = [];
  isdataAvail:boolean = false;
  constructor(private _weeks: WeeksService, private _route:ActivatedRoute) {
  this.weeks[1] = 'Sunday';
  this.weeks[2] = 'Monday';
  this.weeks[3] = 'Tuesday';
  this.weeks[4] = 'Wedneday';
  this.weeks[5] = 'Thursday';
  this.weeks[6] = 'Friday';
  this.weeks[7] = 'Saturday';
	this._route.paramMap.subscribe(params => {
      this.hospId = params.get('hospId');
      this.selDoctor = params.get('docId');
	});
  }

  ngOnInit() {
	this.getTimingsByIds();
  }
  
  getTimingsByIds() {
    if (this.selDoctor != '' && this.hospId != '') {
      this._weeks.getTimingsByIds(this.hospId, this.selDoctor).subscribe((response) => {
        this.availabilityData = response;
      }, Error, () => {
		this.availabilityData.sort(this.compare);
		this.isdataAvail = true;
	  });
    }
  }
  
	compare( a, b ) {
	  if ( a.week_id < b.week_id ){
		return -1;
	  }
	  if ( a.week_id > b.week_id ){
		return 1;
	  }
	  return 0;
	}

}
