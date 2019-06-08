import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  excercises : Excercise[];
  selectedExcercise:Excercise;

  constructor(private trainingService: TrainingService) {
    this.excercises = trainingService.getTrainings();
   }

  ngOnInit() {
    //this.trainingService.cancelExcercise();
  }

  startNewTraining() {
    this.trainingService.startExcercise(this.selectedExcercise);
  }
}
