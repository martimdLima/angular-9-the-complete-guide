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

@Injectable()
export class AuthEffects {

@Effect()
authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START)
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
            const expirationDate = new Date(
              new Date().getTime() + +responseData.expiresIn * 1000
            );
            return new AuthActions.AuthenticateSuccess({
              email: responseData.email,
              userId: responseData.localId,
              token: responseData.idToken,
              expirationDate: expirationDate,
            });
          }),
          catchError((errorResponse) => {
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
