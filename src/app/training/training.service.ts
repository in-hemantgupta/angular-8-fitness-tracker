import { Excercise } from './excercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';

@Injectable()
export class TrainingService {

    constructor(private db: AngularFirestore) {
    }
    excercisesChanged = new Subject<Excercise[]>();
    excerciseChanged = new Subject<Excercise>();
    private excercises: Excercise[] = [];
    private availableExcercises: Excercise[];
    //  = [
    //     { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    //     { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    //     { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    //     { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    // ];

    private runningExcercise: Excercise;

    fetchAvailableExcercises() {
       this.db.collection('availableExcercises')
            .snapshotChanges()
            .pipe(map(result => result.map(res => {
                const doc = res.payload.doc;
                return {
                    id: doc.id,
                    name: doc.data().name,
                    calories : doc.data().calories,
                    duration : doc.data().duration
                }
            })))
            .subscribe((excercises : Excercise[]) => {
                this.availableExcercises = excercises;
                this.excercisesChanged.next([...this.availableExcercises]);
            });
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

    getExcercises() {
        return this.excercises.slice();
    }

}