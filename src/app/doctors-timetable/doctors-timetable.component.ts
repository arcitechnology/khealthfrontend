import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeeksService } from '../services/weeks.service';
import { Idoctor } from '../prototypes/doctorprototype';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-doctors-timetable',
  templateUrl: './doctors-timetable.component.html',
  styleUrls: ['./doctors-timetable.component.css'],
  providers:[WeeksService]
})
export class DoctorsTimetableComponent implements OnInit, OnDestroy {

  doctortimes:any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private _weeks: WeeksService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnInit() {
	this._weeks.getDoctorsTimings().subscribe((data: any) => {
      this.doctortimes = data;
	  this.dtTrigger.next();
	});
  }
  
  ngOnDestroy(){
	this.dtTrigger.unsubscribe();
  }
}
