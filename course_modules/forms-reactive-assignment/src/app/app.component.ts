import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  statusList: any = ['Stable', 'Critical', 'Finished'];
  submitted: boolean = false;

  projectInfo = {
    name: '',
    email: '',
    status: '',
  };

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectData: new FormGroup({
        name: new FormControl(
          null,
          [Validators.required, this.bannedProjectNames.bind(this)],
          this.bannedProjectNamesAsync
        ),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      projectStatus: new FormControl(['Critical']),
    });
  }

  onSubmit() {
    this.submitted = true;

    this.projectInfo.name = this.projectForm.value.projectName;
    this.projectInfo.email = this.projectForm.value.email;
    this.projectInfo.status = this.projectForm.value.projectStatus;
  }

  bannedProjectNames(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'projectTest') {
      return { nameIsForbidden: true };
    }
    return null;
  }

  bannedProjectNamesAsync(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }
}
