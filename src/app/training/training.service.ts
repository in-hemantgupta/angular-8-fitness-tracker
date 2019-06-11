import { Excercise } from './excercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
    get strFinishedExcercises() { return 'finishedExcercises' };
    get strAvailableExcercises() { return 'availableExcercises' };
    private authSubscriptions : Subscription[] = [];
    constructor(private db: AngularFirestore, private uiService :UIService) {
    }
    excercisesChanged = new Subject<Excercise[]>();
    excerciseChanged = new Subject<Excercise>();
    pastExcercisedChanged = new Subject<Excercise[]>();

    private availableExcercises: Excercise[];

    private runningExcercise: Excercise;

    fetchAvailableExcercises() {
        this.authSubscriptions.push(this.db.collection(this.strAvailableExcercises)
            .snapshotChanges()
            .pipe(map(result => result.map((res: any) => {
                const doc = res.payload.doc;
                return {
                    id: doc.id,
                    name: doc.data().name,
                    calories: doc.data().calories,
                    duration: doc.data().duration
                }
            })))
            .subscribe((excercises: Excercise[]) => {
                this.availableExcercises = excercises;
                this.excercisesChanged.next([...this.availableExcercises]);
            }, error =>{
                this.uiService.showSnackBar('Failed to fetch excercises, please try again.', null, 3000);
                this.excercisesChanged.next(null);
            }));
    }

    startExcercise(excercise: Excercise) {
        this.runningExcercise = this.availableExcercises.find(a => a.id == excercise.id);
        this.excerciseChanged.next({ ...this.runningExcercise });
    }

    completeExcercise() {
        this.addToDatabase({
            ...this.runningExcercise, date: new Date(), state: 'completed'
        }
        );
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

    cancelExcercise(progress: number) {
        this.addToDatabase({
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

    addToDatabase(excercise: Excercise) {
        this.db.collection(this.strFinishedExcercises).add(excercise);
    }

    getFinishedExcercises() {
        this.authSubscriptions.push(this.db.collection(this.strFinishedExcercises)
            .valueChanges()
            .subscribe((results : any[]) => {
                //console.log(results);
                let ex = results.map(item => item = {...item, date:  item.date.toDate()});
                this.pastExcercisedChanged.next(ex);
            }, error =>{
                console.log(error);
            }));
    }

    cancelSubscriptions(){
        this.authSubscriptions.forEach(sub=>{sub.unsubscribe()});
    }

}