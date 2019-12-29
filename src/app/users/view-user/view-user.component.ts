import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../prototypes/usersprototype';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  user: Iuser[];
  userId: string = '';
  constructor(private _userService:UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.paramMap.subscribe(params => {
		this.userId = params.get('id');
		if (this.userId) {
			this._userService.getUserDetails(this.userId).subscribe((data:any) => {
					if(data.length){
						this.user = data[0];
						console.log(this.user);
					}else{
						console.log('User not found');
					}				
				},
				(error: any) => {
					console.log(error);
				}
			);
        }
	});
  }

}
