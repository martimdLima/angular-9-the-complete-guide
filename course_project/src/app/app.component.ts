import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { LoggingService } from "./logging.service";
import { Store } from "@ngrx/store";
import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService /* private loggingService: LoggingService */,
    private store: Store<fromApp.AppState>
  ) {}
  /*
    Useful Resources
      https://firebase.google.com/docs/reference/rest/auth/
      https://loading.io/css
      https://jwt.io/
      https://angular.io/guide/dynamic-component-loader
      https://angular.io/guide/ngmodules
      https://angular.io/guide/ngmodule-faq
      Server Routing vs Browser Routing 
      https://academind.com/learn/angular/angular-q-a/#how-to-fix-broken-routes-after-deployment

      Deployed App
      https://ng-course-recipe-book-4d4d5.web.app/recipes
  */

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoAuthenticate());
  }
}
