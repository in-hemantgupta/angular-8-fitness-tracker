import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

let routes : Routes = [
    {path:'login', component : LoginComponent},
    {path:'signup', component : SignupComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[],
    providers:[]

})
export class AuthRoutingModule{

}