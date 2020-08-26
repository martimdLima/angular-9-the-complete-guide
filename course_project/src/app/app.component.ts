import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { LoggingService } from "./logging.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService /* private loggingService: LoggingService */
  ) {}
  /*
    Useful Resources
      https://firebase.google.com/docs/reference/rest/auth/
      https://loading.io/css
      https://jwt.io/
      https://angular.io/guide/dynamic-component-loader
  */

  ngOnInit() {
    this.authService.autoLogin();
    // this.loggingService.printlog("Test Error Message from AppComponent NgOnInit");
  }
}
