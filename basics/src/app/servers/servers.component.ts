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
  serverName: string = 'server';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
   }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created!'
  }

  onUpdateServerName(event: Event) {
    //console.log(event);
    this.serverName = (<HTMLInputElement> event.target).value;
  }

}
