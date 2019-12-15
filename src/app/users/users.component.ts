import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Iuser } from '../prototypes/usersprototype';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UsersService]
})
export class UsersComponent implements OnInit, OnDestroy {
  users:Iuser[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private _userService:UsersService) {
    this._userService.getUsers().subscribe((data) => { 
      console.log('data',data);
      this.users = data;
	  });
  }  
  ngOnInit() {
  }

  ngAfterViewInit(){
    this.dtTrigger.next();
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

}
