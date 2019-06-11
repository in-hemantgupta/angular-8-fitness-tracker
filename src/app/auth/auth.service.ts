import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
import * as fromApp from './../app-reducer';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    isAuthenticated: boolean = false;
    constructor(private router: Router,
        private aAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private snackBar: MatSnackBar,
        private uiService: UIService,
        private store: Store<{ ui: fromApp.State }>) {

    }

    registerUser(authData: AuthData) {
        this.store.dispatch({ type: "START" });
        this.aAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.store.dispatch({ type: "STOP" });
            })
            .catch(error => {
                this.uiService.showSnackBar(error.message, null, 3000);
                this.store.dispatch({ type: "STOP" });
            });
    }

    loginUser(authData: AuthData) {
        this.store.dispatch({ type: "START" });
        this.aAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.store.dispatch({ type: "STOP" });
            })
            .catch(error => {
                this.store.dispatch({ type: "STOP" });
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }

    logoutUser() {
        this.aAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }

    initAuthListener() {
        this.aAuth.authState.subscribe(
            user => {
                if (user) {
                    this.isAuthenticated = true;
                    this.authChange.next(true);
                    this.router.navigate(['/training']);
                }
                else {
                    this.trainingService.cancelSubscriptions();
                    this.isAuthenticated = false;
                    this.authChange.next(false);
                    this.router.navigate(['/login']);
                }
            },
            error => {
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }
}