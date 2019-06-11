import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGaurd implements CanActivate, CanLoad {
    //for lazy loading
    canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
        if (this.authService.isAuth())
            return true;
        else
            this.router.navigate(['/login']);
    }
    //for eager loading the components
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (this.authService.isAuth())
            return true;
        else
            this.router.navigate(['/login']);
    }

    

    constructor(private authService: AuthService, private router: Router) { }
}