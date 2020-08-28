import { Action } from "@ngrx/store";

export const AUTHENTICATE_START = "[Auth] Login Start";
export const AUTHENTICATE_SUCCESS = "[Auth] Login";
export const AUTHENTICATE_FAIL = "[Auth] Login Fail"
export const LOGOUT = "[Auth] Logout";
export const SIGNUP = "[Auth] Signup"
export const SIGNUP_START = "[Auth] Signup Start";

export type AuthActions = AuthenticateSuccess | Logout | AuthenticateStart | AuthenticateFail | SignupStart;

export class AuthenticateStart implements Action {
  readonly type = AUTHENTICATE_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: {email: string; password: string}) {}
}
