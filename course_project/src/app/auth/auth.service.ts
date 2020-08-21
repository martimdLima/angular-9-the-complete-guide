import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
    return this.httpClient.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDpqlLsxDnPVFKZBE-YxOBPQ8-TIF_NIg",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
