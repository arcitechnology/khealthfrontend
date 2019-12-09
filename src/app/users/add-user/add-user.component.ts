import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../prototypes/usersprototype';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  doctor:Iuser;
  constructor(private _userService:UsersService, private router:Router) { 
  }


  ngOnInit() {
  }

  onSubmit(user:Iuser){
    console.log(user);
    let  response = this._userService.saveUser(user).subscribe(
      (data) => {
        this.router.navigate(['/users']);
      },
      (error:any) => {
        console.log(error)
      }
    );
  }

}
