import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var metisMenu: any;
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})


export class MenubarComponent implements OnInit, AfterViewInit {


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
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
