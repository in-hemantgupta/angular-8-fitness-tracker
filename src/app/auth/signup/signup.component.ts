import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  OnSubmit(form) {
    if (form.valid) {
      console.log(form.value.Email);
      console.log(form.value.Password);
      this.authService.registerUser({
        email: form.value.Email,
        password: form.value.Password
      })
    }
  }
}
