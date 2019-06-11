import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material';
import { DialogYesNoComponent } from 'src/app/dialog-yes-no/dialog-yes-no.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { TrainingService } from '../training.service';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})


export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  excercise = this.trainingService.getCurrentExcercise();
  timer: number;
  constructor(public dialog: MatDialog, private trainingService: TrainingService) { }

  startOrResumeTimer() {
    this.excercise = this.trainingService.getCurrentExcercise();
    let step = (this.excercise.duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) { clearInterval(this.timer);
        this.trainingService.completeExcercise();
       }
    }, step);
  }
  ngOnInit() {
    this.startOrResumeTimer();
  }

  stopTraining() {
    let dialogResult = this.dialog.open(DialogYesNoComponent, {
      data: {
        progress: this.progress
      }
    });
    clearInterval(this.timer);
    dialogResult.afterClosed().subscribe(result => {
      //console.log(result);
      if (result == false) {
        this.startOrResumeTimer();
      }
      else {
        this.trainingService.cancelExcercise(this.progress);

      }
    });

  }

}