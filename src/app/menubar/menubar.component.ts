<<<<<<< HEAD
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var metisMenu: any;
=======
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
declare let $: any;
>>>>>>> 6fb50a562393b06126ae8173fffcecd5119f93fa
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
<<<<<<< HEAD


export class MenubarComponent implements OnInit, AfterViewInit {


=======
export class MenubarComponent implements OnInit, AfterViewInit {
  uname:string;
  
>>>>>>> 6fb50a562393b06126ae8173fffcecd5119f93fa
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
	this.uname = 'user';
	$('.button-menu-mobile').on('click',function(event){
		event.preventDefault();
		$('body').toggleClass("enlarged");
	});
  }
  
  ngAfterViewInit() {
      $('#side-menu').metisMenu();	  
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
