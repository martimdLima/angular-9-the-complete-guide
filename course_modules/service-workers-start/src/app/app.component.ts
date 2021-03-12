import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /*
    https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/10617918#questions/11379350
    https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/10617918#questions/11421670

    https://angular.io/guide/service-worker-intro
    https://academind.com/learn/progressive-web-apps

    // HTTP Server command
      http-server-spa service-workers-start
  */

  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(fetchedPosts => (this.posts = fetchedPosts));
  }
}
