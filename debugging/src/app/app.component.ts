import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // without defining the servers array, we get an error
  // 'Cannot read property 'push' of undefined'
  //   servers;

  servers: string[] = [];

  onAddServer() {
    this.servers.push('Another Server');
  }

  onRemoveServer(id: number) {
    const position = id + 1;
    this.servers.splice(position, 1);
  }
}
