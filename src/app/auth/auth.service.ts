import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';

export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userid: Math.round(Math.random() * 100000).toString()
        };
        console.log('user registered');
        this.authChange.next(true);
    }

    loginUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userid: Math.round(Math.random() * 100000).toString()
        };
        console.log('user logged in');
        this.authChange.next(true);
    }

    logoutUser() {
        this.user = null;
        this.authChange.next(false);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }
}