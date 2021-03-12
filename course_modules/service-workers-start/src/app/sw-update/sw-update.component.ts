import { Component, OnInit, ApplicationRef } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent, UpdateActivatedEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { slideAnimation } from '../animations/slide.animation';
 
 
@Component({
  selector: 'app-sw-update',
  templateUrl: './sw-update.component.html',
  styleUrls: [ './sw-update.component.css' ],
  animations: [ slideAnimation ]
})
export class SwUpdateComponent implements OnInit {
 
  updateAvailableEvent: UpdateAvailableEvent;
 
  constructor(private swUpdate: SwUpdate, private applicationRef: ApplicationRef) { }
 
 
  ngOnInit(): void {
 
    if (this.swUpdate.isEnabled) {
 
      this.swUpdate.available
        .subscribe((event: UpdateAvailableEvent) => {
          this.updateAvailableEvent = event;
          console.log('A new version was downloaded:', event.available.hash);
          console.log('The currently running version is', event.current.hash);
        });
 
      this.applicationRef.isStable
        .pipe(first(Boolean), switchMap(() => interval(10 * 1000)))
        .subscribe(() => {
          console.log(`Automatic update check at ${new Date().toLocaleTimeString()} ...`);
          this.swUpdate.checkForUpdate().then(() => console.log('... update check finished.'));
        });
 
      this.swUpdate.activated
        .subscribe((event: UpdateActivatedEvent) => {
          alert('\n' + 'An event was detected in the "swUpdate.activated" subscription:' +
                '\n\n' + 'The updated version was activated for this browser tab.' +
                '\n' + `Previous version: ${event.previous.hash}` +
                '\n' + `Updated version: ${event.current.hash}`
          );
        });
 
    }
 
  }
 
 
  updateNow(): void {
    console.log('User action: Update requested.');
    if (confirm('\n' + 'An additional confirm dialog like this might be useful in some apps:' +
                '\n\n' + '"If you install the new app version now,' +
                '\n' + 'some of your temporary data might be lost afterwards.' +
                '\n\n' + 'Do you still want to update immediately?"'
      )) {
      this.updateAvailableEvent = null;
      this.swUpdate.activateUpdate().then(() => {
        if (confirm('\n' + 'The "swUpdate.activateUpdate" Promise was resolved:' +
              '\n\n' + 'The updated version was activated for this browser tab.' +
              '\n' + 'Do you want to restart the app now (recommended)?'
        )) {
          window.location.reload();
        } else {
          alert('\n' + 'The app has not been reloaded!' +
              '\n\n' + 'Since you already registered the new app version in this browser tab,' +
              '\n' + 'lazy loading of a module not yet visited would now fail, until you reload the app!');
        }
      });
    } else {
      console.log('User action: Update process cancelled.');
      this.updateAvailableEvent = null;
    }
  }
 
 
  updateLater(): void {
    console.log('User action: Immediate update rejected.');
    this.updateAvailableEvent = null;
  }
 
}