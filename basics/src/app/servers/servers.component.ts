import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
    //selector: '[app-servers]'
    //selector '.app-servers'
  /*template: `<app-server></app-server>
             <app-server></app-server>`,*/
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No server created!'
  userCreationStatus: string = 'No user created!'
  serverName: string = 'testServer';
  username: string = '';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
   }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server ' + this.serverName + ' was created!'
  }
}
