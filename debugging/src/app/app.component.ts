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

    // using the sourceMap to debug the code, we can see that the addiction of one to the id,
    // was causing the error deleting the "servers"
    // const position = id + 1;
    // this.servers.splice(position, 1);

    const position = id;
    this.servers.splice(position, 1);
  }
}
