import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalsService } from '../services/hospital.service';
import { Ihospital } from '../prototypes/hospitalprototype';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
  providers: [HospitalsService]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};


  hospitals: Ihospital[];

  dtTrigger: Subject<any> = new Subject();



  constructor(private _hospitalService: HospitalsService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    };
  }

  ngOnInit() {
    this._hospitalService.getHospitals().subscribe((data) => { 
      
      this.hospitals = data;
      this.dtTrigger.next();
    });
   
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

}
