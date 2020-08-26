import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  /*
    Useful Resources
      https://firebase.google.com/docs/reference/rest/auth/
      https://loading.io/css
  */

  ngOnInit() {
    this.authService.autoLogin();
  }
}
