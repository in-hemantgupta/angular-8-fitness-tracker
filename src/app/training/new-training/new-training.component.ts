import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output()  onStartNewTraining = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  startNewTraining() {
    this.onStartNewTraining.emit();
  }
}
