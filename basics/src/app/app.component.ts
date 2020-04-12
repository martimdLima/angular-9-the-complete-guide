import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  /*styles: [`h3 {
    color: dodgerblue;
  }`]*/
})
export class AppComponent {
  username: string  = '';
  title: string = 'basics';
  userCreationStatus: string = 'No User created';
  onDisplay = false;
  timeStamps = [];
  counter = 0;

  onCreateUsername(username: string) {
    this.userCreationStatus = 'Username ' + username + ' was created!';
    this.username = '';
  }

  onShowDetails() {

    this.counter+=1;

    this.onDisplay = !this.onDisplay;

    this.timeStamps.push(new Date());
  }
}
