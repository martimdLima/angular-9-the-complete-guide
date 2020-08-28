import { Actions, ofType, Effect } from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

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
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem("userData", JSON.stringify(user));
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
          tap((responseData) => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
          }),
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
          tap((responseData) => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
          }),
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
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_AUTHENTICATE),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem("userData"));

      if (!userData) {
        return {
          type: "DUMMY",
        };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        //this.user.next(loadedUser);
        const expirationTime =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationTime);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
        });
        // this.autoLogout(expirationTime);
      }
      return {
        type: "DUMMY",
      };
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem("userData");
      this.router.navigate(["/auth"]);
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
