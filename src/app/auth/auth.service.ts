import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();

    constructor(private router : Router){

    }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userid: Math.round(Math.random() * 100000).toString()
        };
        this.authSuccess();
    }

    loginUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userid: Math.round(Math.random() * 100000).toString()
        };
       this.authSuccess();
    }

    logoutUser() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    authSuccess(){
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}