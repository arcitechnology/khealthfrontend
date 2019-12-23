import { Component, OnInit } from '@angular/core';
import { WeeksService } from '../services/weeks.service';
import { Iweek } from '../prototypes/weekprototype';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-doctors-timetable',
  templateUrl: './doctors-timetable.component.html',
  styleUrls: ['./doctors-timetable.component.css'],
  providers:[WeeksService]
})
export class DoctorsTimetableComponent implements OnInit {

  weeks:Iweek[] = [];
  constructor(private _weeks:WeeksService) { 
	this._weeks.getWeeks().subscribe((data) => {	 
	  this.weeks = data.weeks
	});
  }

  ngOnInit() {
  }

}
