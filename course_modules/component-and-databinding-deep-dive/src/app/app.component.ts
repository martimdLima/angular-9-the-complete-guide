import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  serverElements = [
    { type: "server", name: "TestServer1", content: "Test Content" },
    { type: "server", name: "TestServer2", content: "Test Content" },
    { type: "blueprint", name: "TestServer3", content: "Test Content" },
    { type: "blueprint", name: "TestServer4", content: "Test Content" },
  ];

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onChangesFirst() {
    this.serverElements[0].name = 'Changed';
  }

  onDestroyFirst(){
    this.serverElements.splice(0, 1);
  }
}
