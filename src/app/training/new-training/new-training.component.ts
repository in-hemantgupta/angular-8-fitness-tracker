import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  excercises: Excercise[];
  selectedExcercise: Excercise;
  newTrainingForm = new FormGroup({
    selectedExcercise: new FormControl('', { validators: [Validators.required] })
  });

  constructor(private trainingService: TrainingService) {
    this.excercises = trainingService.getTrainings();
  }

  ngOnInit() {
    //this.trainingService.cancelExcercise();
  }

  startNewTraining() {
    console.log(this.newTrainingForm);
    if (this.newTrainingForm.valid)
      this.trainingService.startExcercise(this.newTrainingForm.value.selectedExcercise);
  }
}
