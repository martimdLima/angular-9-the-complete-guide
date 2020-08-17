import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;

  subscriptionList = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription = 'Advanced';

  userInfo = {
    username: '',
    email: '',
    password: '',
    subscriptionType: '',
  };

  submitted = false;

  constructor() {}

  onSubmit() {
    this.submitted = true;

    console.log(this.signupForm);

    this.userInfo.username = this.signupForm.value.userData.username;
    this.userInfo.email = this.signupForm.value.userData.email;
    this.userInfo.password = this.signupForm.value.userData.password;
    this.userInfo.subscriptionType = this.signupForm.value.userData.subscription;

    this.signupForm.resetForm({
      userData: {
        username: '',
        email: '',
        password: '',
        subscription: this.defaultSubscription,
      },
    });
  }
}
