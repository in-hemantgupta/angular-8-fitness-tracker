import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/app-reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showSpinner$: Observable<boolean>;
  loginForm: FormGroup;
  
  constructor(private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    })
    this.showSpinner$ = this.store.pipe(
      map(result => result.ui.isLoading));
  }

  onSubmit() {
    //if (this.loginForm.valid)
    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
