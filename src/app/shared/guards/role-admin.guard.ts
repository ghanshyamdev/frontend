import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {KEY_AUTHINFO, Role} from '../constants/constants';
import {AuthenticationInfo} from '../services/http-calls.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem(KEY_AUTHINFO)) {
      const authInfo: AuthenticationInfo = JSON.parse(localStorage.getItem(KEY_AUTHINFO));
      if (authInfo.role.toLowerCase() === Role.Admin.toLowerCase()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
