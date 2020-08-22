import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
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
        catchError((errorResponse) => {
          //let errorMessage: string = errorResponse.error.error.message;
          let errorMessage: string = "An unknown error occured!";

          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }

          switch (errorResponse.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage = "This email already exists";
              break;
            case "OPERATION_NOT_ALLOWED":
              errorMessage = "This operation is not allowed";
              break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              errorMessage = "Too many attempts, try again later please";
              break;
            // default:
            //   errorMessage = 'An unknown error occured!';
          }

          return throwError(errorMessage);
        })
      );
  }
}
