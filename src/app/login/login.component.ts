import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    userName: '', userPwd: ''
  }

  constructor(private service: AuthService, private router :Router) { }

  login() {
    console.log(this.loginData);
    this.service.login(this.loginData).subscribe(
      data => {
      console.log(data);
      localStorage.setItem('userName',data.userName);
      localStorage.setItem('token_Value',data.token);
      localStorage.setItem('Saverefreshtokene',data.refreshtoken);
      localStorage.setItem('exptDate',data.expDate);
      this.router.navigate(['/entries']);
    },
      (error) => alert('Error'));
  }

}
