import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../prototypes/usersprototype';
import {Router} from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user:Iuser;
  constructor(private _userService:UsersService, private router:Router, public sweetAlertService: SweetAlertService,) {
  }

  ngOnInit() {
  }

  onSubmit(user:Iuser){
    console.log(user);
    let  response = this._userService.saveUser(user).subscribe(
      (data) => {
        this.sweetAlertService.showAlert('success', 'User created successfully.', 'Done!');
        this.router.navigate(['/users']);
      },
      (error:any) => {
		let msg = error.error[0].message.replace(/[\"]/gi, '');
        this.sweetAlertService.showAlert('error', msg, 'Error!');
      }
    );
  }

}
