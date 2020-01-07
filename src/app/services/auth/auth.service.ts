import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const data = { email: email, user_password: password };
    return this.http.post(environment.apiUrl + "login", data).pipe(map((user: any) => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }));
  }

  getCurrentUser() {
    return (localStorage.getItem('currentUser') != null
      && localStorage.getItem('currentUser') !== 'undefined'
      && localStorage.getItem('currentUser') !== '') ? JSON.parse(localStorage.getItem('currentUser')) : null;
  }



  isAuthenticated() {
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return (currentUser && currentUser.token);
  }

  getUserName(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return (currentUser && currentUser.userdata.name);
  }

  logout() {
    return this.http.put(environment.apiUrl + "logout", {})
  }

  clearLocalStorage() {
    localStorage.removeItem('currentUser');
  }
}
