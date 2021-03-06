import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter();

  isAuth = false;
  autSubscribe: Subscription;

  ngOnInit() {}

  ngOnDestroy(): void {
    this.autSubscribe.unsubscribe();
  }

  toggleSideNav() {
    this.sideNavToggle.emit();
  }
  constructor(private authService: AuthService, private router : Router) {
    this.autSubscribe = this.authService.authChange.subscribe(result => {
      this.isAuth = result;
    });
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

}
