import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule } from '@angular/flex-layout';
import {StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { SidenavListComponent } from './Navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './Navigation/header/header.component';
import { DialogYesNoComponent } from './dialog-yes-no/dialog-yes-no.component';
import { AuthService } from './auth/auth.service';
import { AngularFireAppModule } from './angular-fire.module';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { appReducer } from './app-reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SidenavListComponent,
    HeaderComponent,
    DialogYesNoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireAppModule,
    AuthModule,
    TrainingModule,
    StoreModule.forRoot({ui: appReducer})
  ],
  providers: [AuthService, UIService],
  bootstrap: [AppComponent],
  entryComponents:[DialogYesNoComponent]
})
export class AppModule { }
