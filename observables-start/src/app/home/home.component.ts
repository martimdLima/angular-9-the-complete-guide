import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';

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

    this.observableSubscription = customIntervalObservable.subscribe(
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
