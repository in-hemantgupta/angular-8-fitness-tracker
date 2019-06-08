import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Excercise } from './excercise.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  newTrainingStarted = false;
  trainingSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingSubscription = this.trainingService.excerciseChanged.subscribe(result => {
      if (result) {
        this.newTrainingStarted = true;
      }
      else{
        this.newTrainingStarted = false;
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.trainingSubscription.unsubscribe();
  }
}
