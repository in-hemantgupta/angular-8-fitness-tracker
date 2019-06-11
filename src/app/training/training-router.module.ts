import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGaurd } from '../auth/auth.gaurd';


let routes: Routes = [
    {
        path: '', component: TrainingComponent
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class TrainingRouterModule { }