import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Subject } from 'rxjs';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data:any = [];
  dashboard_data:any;
  constructor(private _adminserve: AdminService, public sweetAlertService: SweetAlertService, private router: Router, private route: ActivatedRoute) {
		this._adminserve.getDashboard().subscribe((data: any) => {
		console.log(data.data);
		if(data.data.length>0){
		console.log('hello');
			this.dashboard_data = data.data[0];
		}
		
	});
  }
  ngOnInit() {
  }

}
