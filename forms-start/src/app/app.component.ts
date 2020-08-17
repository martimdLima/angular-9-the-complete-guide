import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;

  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
    /*
    // We use the SetValue to update the FormControl , FormGroup or FormArray. 
    // When we use it to update the FormGroup or FormArray the SetValue requires that the object must match the structure of the FormGroup or FormArray exactly. 
    // Otherwise, it will result in an error.

    this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer:'',
      gender: 'male'
    });
    */

    // The PatchValue is used to update only a subset of the elements of the FormGroup or FormArray.
    // It will only update the matching objects and ignores the rest.

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  /*   onSubmit() {
    console.log(this.signupForm);
  } */
}

/*
  Useful Resources:
    https://angular.io/api/forms/Validators

    https://angular.io/api?type=directive
*/
