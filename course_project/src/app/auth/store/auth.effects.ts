import { Actions, ofType, Effect } from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
  });
};

const handleError = (errorResponse: any) => {
  let errorMessage: string = errorResponse.error.error.message;

  if (!errorResponse.error || !errorResponse.error.error) {
    errorMessage = "An unknow error occurred";
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

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

  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.httpClient
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            environment.firebaseAPIkey,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((responseData) => {
            return handleAuthentication(
              +responseData.expiresIn,
              responseData.email,
              responseData.localId,
              responseData.idToken
            );
          }),
          catchError((errorResponse) => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_START),
    switchMap((authData: AuthActions.AuthenticateStart) => {
      return this.httpClient
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            environment.firebaseAPIkey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((responseData) => {
            return handleAuthentication(
              +responseData.expiresIn,
              responseData.email,
              responseData.localId,
              responseData.idToken
            );
          }),
          catchError((errorResponse) => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {}
}
