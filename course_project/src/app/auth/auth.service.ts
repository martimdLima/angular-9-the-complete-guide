import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new Subject<User>();

  constructor(private httpClient: HttpClient) {}

  signupNewUser(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDpqlLsxDnPVFKZBE-YxOBPQ8-TIF_NIg",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDpqlLsxDnPVFKZBE-YxOBPQ8-TIF_NIg",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string = errorResponse.error.error.message;

    switch (errorMessage) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage =
          "There is no user record corresponding to this identifier.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid.";
        break;
      case "USER_DISABLED":
        errorMessage =
          "There is no user record corresponding to this identifier.";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = "This operation is not allowed";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "Too many attempts, try again later please";
        break;
      default:
        errorMessage = "An unknown error occured!";
    }

    return throwError(errorMessage);
  }
}
