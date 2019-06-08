import { Excercise } from './excercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrainingService {
    excerciseChanged = new Subject<Excercise>();
    private excercises: Excercise[]= [];
    private availableExcercises: Excercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runningExcercise: Excercise;

    getTrainings() {
        return this.availableExcercises.slice(0);
    }

    startExcercise(excercise: Excercise) {
        this.runningExcercise = this.availableExcercises.find(a => a.id == excercise.id);
        this.excerciseChanged.next({ ...this.runningExcercise });
    }

    completeExcercise() {
        this.excercises.push({ ...this.runningExcercise, date: new Date(), state: 'completed' });
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

    cancelExcercise(progress: number) {
        this.excercises.push({
            ...this.runningExcercise,
            date: new Date(),
            state: 'cancelled',
            calories: this.runningExcercise.calories * (progress / 100),
            duration: this.runningExcercise.duration * (progress / 100)
        });
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

    getCurrentExcercise() { return { ...this.runningExcercise } };

    getExcercises(){
        return this.excercises.slice();
    }

}