import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter();
  authSubscription: Subscription;
  isAuth = false;

  onSideNavToggle(action: string) {
    this.sideNavToggle.emit();
    if (action == 'logout')
      this.authService.logoutUser();
  }
  constructor(private authService: AuthService) {
    this.authSubscription = authService.authChange.subscribe(result => {
      this.isAuth = result;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authSubscription.unsubscribe();
  }

}
