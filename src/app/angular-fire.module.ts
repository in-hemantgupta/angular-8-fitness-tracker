import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';

@NgModule({
    imports:[
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        AngularFirestoreModule
    ],
    exports: [AngularFireStorageModule, AngularFirestoreModule]
})
export class AngularFireAppModule{}