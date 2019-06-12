import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UIService } from '../../../../src/app/shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../../src/app/app-reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  showLoading$ :Observable<boolean>;
  constructor(private authService: AuthService, 
    private uiService : UIService,
    private store : Store<{ui: State}>) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.showLoading$ = this.store.pipe(map(result=>result.ui.isLoading));
  }

  OnSubmit(form) {
    if (form.valid) {
      //console.log(form.value.Email);
      this.authService.registerUser({
        email: form.value.Email,
        password: form.value.Password
      })
    }
  }
}
