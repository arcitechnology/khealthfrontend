import { Component, OnInit } from '@angular/core';
// import { AppConstants } from 'src/app/shared/helpers/constants/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { UserService } from 'src/app/shared/services/user/user.service';
import { SweetAlertService } from '../services/sweet-alert/sweet-alert.service';
import { UsersService } from '../services/users.service';
// import { SweetAlertService } from 'src/app/shared/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  // public pageTitle = AppConstants.Titles.ChangePassword;
  public changePasswordForm: FormGroup;
  public submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersService,
    public sweetAlertService: SweetAlertService) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
    }, {
        validator: this.MustMatch('password', 'confirm_password')
      });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  updatePassword() {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      const passwordmodel = {
        old_password: this.changePasswordForm.get('old_password').value,
        new_password: this.changePasswordForm.get('password').value,
       // confirm_password: this.changePasswordForm.get('confirm_password').value,
      };
      this.userService.updatePassword(passwordmodel,  1).subscribe(response => {
        // this.router.navigate(['/users']);
        this.submitted = false;
        this.changePasswordForm.reset();
        this.sweetAlertService.showAlert('success', 'Password updated successfully.', 'Updated!');
      });
    }
  }

}
