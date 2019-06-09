import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit , OnDestroy{
  excercises: Excercise[];
  excercisesSubscription = new Subscription();
  selectedExcercise: Excercise;
  newTrainingForm = new FormGroup({
    selectedExcercise: new FormControl('', { validators: [Validators.required] })
  });

  constructor(private trainingService: TrainingService) {
    this.excercisesSubscription = trainingService.excercisesChanged
      .subscribe((results: Excercise[]) => {
        this.excercises = results;
      });
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExcercises();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.excercisesSubscription.unsubscribe();
  }

  startNewTraining() {
    console.log(this.newTrainingForm);
    if (this.newTrainingForm.valid)
      this.trainingService.startExcercise(this.newTrainingForm.value.selectedExcercise);
  }
}
