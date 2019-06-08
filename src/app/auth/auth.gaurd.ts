import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGaurd implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (this.authService.isAuth())
            return true;
        else
            this.router.navigate(['/login']);
    }

    constructor(private authService: AuthService, private router: Router) { }
}