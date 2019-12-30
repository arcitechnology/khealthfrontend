import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, AfterViewInit {
  uname:string;
  
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
	this.uname = 'user';
	$('.button-menu-mobile').on('click',function(event){
		event.preventDefault();
		$('body').toggleClass("enlarged");
	});
  }
  
  
  ngAfterViewInit() {
    // alert();
    jQuery("#side-menu").metisMenu();
  }

  //  $("#metismenu").metisMenu({toggle:true});

  logout() {
    this.authService.logout().subscribe(res => {
      this.authService.clearLocalStorage();
      this.router.navigate(['/login']);
    }, error => {
      this.authService.clearLocalStorage();
      this.router.navigate(['/login']);
    });
  }

}
