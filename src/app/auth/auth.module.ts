import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
    declarations:[
        SignupComponent,
        LoginComponent
    ],
    imports: [
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        CommonModule
    ],
    exports: [ReactiveFormsModule],
    providers: []
})
export class AuthModule {

}