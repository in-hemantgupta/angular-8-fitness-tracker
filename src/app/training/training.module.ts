import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingService } from './training.service';
import { TrainingRouterModule } from './training-router.module';


@NgModule({
    declarations: [
        TrainingComponent,
        NewTrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent
    ],
    imports: [
        TrainingRouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [],
    providers: [TrainingService]
})
export class TrainingModule {

}