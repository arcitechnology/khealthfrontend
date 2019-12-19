import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../app/services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Komodo Health Services';
  constructor(private authService: AuthService) { }

}
