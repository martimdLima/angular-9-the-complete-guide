import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  id: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  /*
  A Subject is a special type of Observable which shares a single execution path among observers.

  You can think of this as a single speaker talking at a microphone in a room full of people. 
  Their message (the subject) is being delivered to many (multicast) people (the observers) at once. 
  This is the basis of multicasting. Typical observables would be comparable to a 1 on 1 conversation.
  */

  onActivate() {
    this.userService.activatedEmitter.next(true);
  }
}
