import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../services/sweet-alert/sweet-alert.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  public userForm: FormGroup;
  public submitted = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public sweetAlertService: SweetAlertService,
    private userService: UsersService, ) {

  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    });
    this.userService.getUserInfo().subscribe((response: any) => {
      console.log('response', response.user);
      const user = response.user[0];
      this.userForm = this.formBuilder.group({
        username: [user.user_name, [Validators.required]],
        email: [user.email, [Validators.required, Validators.email]],
        mobile: [user.mobile, [Validators.required, Validators.maxLength(10),Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
      });
    }, error => {

    });

  }

  updateUserinfo() {
    this.submitted = true;
    if (this.userForm.valid) {
      const UserInfoModel = {
        user_name: this.userForm.get('username').value,
        email: this.userForm.get('email').value,
        mobile: this.userForm.get('mobile').value,
        // confirm_password: this.changePasswordForm.get('confirm_password').value,
      };
      this.userService.updateUserInfo(UserInfoModel).subscribe(response => {
        // this.router.navigate(['/users']);
        this.submitted = false;
        this.userForm.reset();
        this.sweetAlertService.showAlert('success', 'UserData updated successfully.', 'Updated!');
        this.router.navigate(['/dashboard']);
      });
    }
  }

}
