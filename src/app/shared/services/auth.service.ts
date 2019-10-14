import { Injectable } from '@angular/core';
import { KEY_ACCESSTOKEN, KEY_AUTHINFO, KEY_EXPIRESAT } from '../constants/constants';
import { NO_ACCESS_TOKEN } from '../constants/error-message';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) {}

  public isAuthenticated(): boolean {
    // -- check access token exists
    if (!localStorage.getItem(KEY_AUTHINFO)) {
      console.error(NO_ACCESS_TOKEN.message);
      return false;
    }
    // -- Check whether the current time is past the
    // -- access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem(KEY_EXPIRESAT));
    return new Date().getTime() < expiresAt;
  }

  public logout() {
    // -- Remove tokens and expiry time from localStorage
    localStorage.removeItem(KEY_ACCESSTOKEN);
    localStorage.removeItem(KEY_EXPIRESAT);
    localStorage.removeItem(KEY_AUTHINFO);
    // -- Go back to the home route if redirectTo is null
    this.router.navigate(['/']);
  }
}
