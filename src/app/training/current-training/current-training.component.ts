import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material';
import { DialogYesNoComponent } from 'src/app/dialog-yes-no/dialog-yes-no.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})


export class CurrentTrainingComponent implements OnInit {
  @Output() onExitTraining = new EventEmitter();
  progress = 0;
  timer: number;
  constructor(public dialog: MatDialog) { }

  startOrResumeTimer(){
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.timer >= 100) { clearInterval(this.timer); }
    }, 1000);
  }
  ngOnInit() {
    this.startOrResumeTimer();
  }

  stopTraining() {
    let dialogResult = this.dialog.open(DialogYesNoComponent, {data:{
      progress: this.progress
    }});
    clearInterval(this.timer);
    dialogResult.afterClosed().subscribe(result => {
      console.log(result);
      if (result == false){
        this.startOrResumeTimer();
      }
      else{
        this.onExitTraining.emit();
      }
    });

  }

}