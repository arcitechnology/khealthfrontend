import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
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
