import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import 'metismenu';
declare let $: any;
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, AfterViewInit {


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
	$('.button-menu-mobile').on('click',function(event){
		event.preventDefault();
		$('body').toggleClass("enlarged");
	});
  }
  ngAfterViewInit() {
      $('#side-menu').metisMenu();
   }

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
