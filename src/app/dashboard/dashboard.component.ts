import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patients:any = [1,2,3,4,5,6,7,8];
  constructor() { }

  ngOnInit() {
  }

}
