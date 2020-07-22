import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'databinding-assignment';

  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(intervalTime: number) {

    if(intervalTime % 2 == 0) {
      this.evenNumbers.push(intervalTime);
    } else {
      this.oddNumbers.push(intervalTime);
    }
    console.log(intervalTime);
  }
}
