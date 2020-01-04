import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-mapping-doctors',
  templateUrl: './mapping-doctors.component.html',
  styleUrls: ['./mapping-doctors.component.css']
})
export class MappingDoctorsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor() {
	this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnInit() {
  }
	
	onSubmit(f){
	}
}
