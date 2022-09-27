import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm?: FormGroup

  constructor(private fb: FormBuilder, private service: AuthService, private router:Router) {
    this.registerForm = fb.group({
      userName: ['', Validators.required],
      userPwd: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('userPwd', 'ConfirmPassword')
    })

  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.service.register(this.registerForm?.value).subscribe((data: any) => {
      console.log('data', data);
      localStorage.setItem('userName',data.userName);
      localStorage.setItem('token_Value',data.token);
      this.router.navigate(['/entries']);
    })
  }
}

function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
