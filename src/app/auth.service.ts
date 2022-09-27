import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'http://localhost:52756/api/Authebtication/'

  constructor(private Http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.Http.post(this.baseURL + 'user-register', user);
  }
  login(user: any): Observable<any> {
    return this.Http.post(this.baseURL + 'user-login', user);
  }

  refreshtoken(tokenRefreshVM: any) {
    return this.Http.post(this.baseURL + 'refresh-token', tokenRefreshVM);
  }

  get getUserName() {

    return localStorage.getItem('userName');
  }
  get getisAuthicated() {

    return !!localStorage.getItem('token_Value');
  }
  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('token_Value');
    this.router.navigate(['/user-login']);
  }
}
