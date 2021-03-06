import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<String>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-c8703.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response',
          responseType: 'json', // responseType can be changed accordingly to: 'text', 'blob', 'json', etc, despite normally being 'json'
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-c8703.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: new HttpParams().set('print', 'pretty'),
          responseType: 'json',
        }
      )
      .pipe(
        // (responseData: { [key: string]: Post })
        map((responseData) => {
          const postsArray: Post[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          // send to the analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete('https://ng-complete-guide-c8703.firebaseio.com/posts.json', {
        observe: 'events',
        responseType: 'json',
      })
      .pipe(
        tap((event) => {
          console.log(event);

          if (event.type === HttpEventType.Sent) {
            console.log(event.type);
          }

          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
