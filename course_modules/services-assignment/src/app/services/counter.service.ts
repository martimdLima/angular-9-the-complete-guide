import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  statusChangesCounter: number = 0;
  inactiveToActiveCounter: number = 0;
  activeToInactiveCounter: number = 0;

  incrementInactiveToActive() {
    this.statusChangesCounter++;
    this.inactiveToActiveCounter++;
    console.log('TotalCounter: ' + this.statusChangesCounter);
    console.log('inactiveToActiveCounter: ' + this.inactiveToActiveCounter);
  }

  incrementActiveToInactive() {
    this.statusChangesCounter++;
    this.activeToInactiveCounter++;
    console.log('TotalCounter: ' + this.statusChangesCounter);
    console.log('activeToInactiveCounter: ' + this.activeToInactiveCounter);
  }
}
