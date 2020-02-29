import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-departments-avail',
  templateUrl: './update-departments-avail.component.html',
  styleUrls: ['./update-departments-avail.component.css']
})
export class UpdateDepartmentsAvailComponent implements OnInit {

  _loop:any = [];
  hospital_id:number;
  constructor(private _admin: AdminService) { 
	this._admin.getAvailDepart().subscribe((data: any) => {
      this._loop = data;
	});
  }
  ngOnInit() {
  
  }
  
  sendValues(hospital_id:number){
	console.log(hospital_id);
  }

}
