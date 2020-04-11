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

  onUpdateServerName(event: Event) {
    //console.log(event);
    this.serverName = (<HTMLInputElement> event.target).value;
  }

  onCreateUsername(username: string) {
    this.userCreationStatus = 'Username ' + username + ' was created!';
    this.username = '';
  }
}
