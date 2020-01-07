import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../prototypes/usersprototype';
import { Router, ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
	user: Iuser;
	submitted = false;
	public userId: string = '';
	public userForm: FormGroup;

	constructor(private _userService: UsersService, private router: Router, public sweetAlertService: SweetAlertService, private formBuilder: FormBuilder,
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		//validator initialization
		this.userForm = this.formBuilder.group({
			user_name: ['', Validators.required],
			user_password: ['', [Validators.required, Validators.minLength(6)]],
			user_role_id: ['', Validators.required],
			mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
			email: ['', [Validators.required, Validators.email]],
			status: ['', Validators.required]
		});

		// get data and set to form
		this.route.paramMap.subscribe(params => {
			this.userId = params.get('id');
			if (this.userId) {
				this._userService.getUserDetails(this.userId).subscribe((data: any) => {
					if (data.length) {
						this.user = data[0];
						this.userForm = this.formBuilder.group({
							user_name: [this.user.user_name, Validators.required],
							user_role_id: [this.user.user_role_id, Validators.required],
							mobile: [this.user.mobile, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
							email: [this.user.email, [Validators.required, Validators.email]],
							status: [this.user.status, Validators.required]
						});
					} else {
						console.log('user not found');
					}
				},
					(error: any) => {
						console.log(error);
					}
				);
			}
		});
	}

	get f() {
		return this.userForm.controls;
	}

	onSubmit() {

		this.submitted = true;
		if (this.userForm.invalid) {
			return;
		}

		if (this.userId && this.userId != '') {
			const userdata = {
				user_name: this.f.user_name.value,
				// user_password: this.f.user_password.value,
				user_role_id: this.f.user_role_id.value,
				mobile: this.f.mobile.value,
				email: this.f.email.value,
				status: this.f.status.value + ''
			};

			this._userService.updateUser(userdata, this.userId).subscribe(
				(data) => {
					this.sweetAlertService.showAlert('success', 'User updated successfully.', 'Done!');
					this.router.navigate(['/users']);
				},
				(error: any) => {
					console.log(error)
				}
			);
		} else {
			const userdata = {
				user_name: this.f.user_name.value,
				user_password: this.f.user_password.value,
				user_role_id: this.f.user_role_id.value,
				mobile: this.f.mobile.value,
				email: this.f.email.value,
				status: this.f.status.value
			};
			this._userService.saveUser(userdata).subscribe(
				(data) => {
					this.sweetAlertService.showAlert('success', 'User created successfully.', 'Done!');
					this.router.navigate(['/users']);
				},
				(error: any) => {
					let msg = error.error[0].message.replace(/[\"]/gi, '');
					this.sweetAlertService.showAlert('error', msg, 'Error!');
				}
			);
		}
	}

}
