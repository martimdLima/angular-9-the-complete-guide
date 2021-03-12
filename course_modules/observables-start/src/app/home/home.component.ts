import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private observableSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    /*     
    this.observableSubscription = interval(1000).subscribe((count) => {
      console.log(count);
    }); */

    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        // A handler for each delivered value. Called zero or more times after execution starts. - Required
        observer.next(count);

        // A handler for the execution-complete notification.
        // Delayed values can continue to be delivered to the next handler after execution is complete. - Optional
        if (count == 2) {
          observer.complete();
        }

        //  A handler for an error notification.
        // An error halts execution of the observable instance. - Optional
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }

        count++;
      }, 1000);
    });

    /*
      Operators are functions. There are two kinds of operators:
        Pipeable Operators are the kind that can be piped to Observables using the syntax observableInstance.pipe(operator()). 
        When called, they do not change the existing Observable instance. 
        Instead, they return a new Observable, whose subscription logic is based on the first Observable.

        A Pipeable Operator is essentially a pure function which takes one Observable as input and generates another Observable as output. 
        Subscribing to the output Observable will also subscribe to the input Observable.
        
        Creation Operators are the other kind of operator, which can be called as standalone functions to create a new Observable. 
        For example: of(1, 2, 3) creates an observable that will emit 1, 2, and 3, one right after another.
   */

    this.observableSubscription = customIntervalObservable
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data) => {
          return 'Round ' + data;
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log('Completed!');
        }
      );
  }

  ngOnDestroy() {
    this.observableSubscription.unsubscribe();
  }
}
