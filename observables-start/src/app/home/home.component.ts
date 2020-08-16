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
        observer.next(count);
        count++;
        //observer.error();
        //observer.complete()
      }, 1000);
    });

    this.observableSubscription = customIntervalObservable.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.observableSubscription.unsubscribe();
  }
}
