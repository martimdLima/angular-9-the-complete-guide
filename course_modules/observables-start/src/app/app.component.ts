import { OnInit, Component, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated: boolean = false;

  private activatedSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(
      (didActivate) => {
        this.userActivated = didActivate;
      }
    );
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }
}

/*
Useful Resources:
  Official Docs: https://rxjs-dev.firebaseapp.com/

  RxJS Series: https://academind.com/learn/javascript/understanding-rxjs/

  Updating to RxJS 6: https://academind.com/learn/javascript/rxjs-6-what-changed/
*/
