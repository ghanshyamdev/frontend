import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { KEY_AUTHINFO, Role } from '../shared/constants/constants';
import { AuthenticationInfo } from '../shared/services/http-calls.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showItem = false;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem(KEY_AUTHINFO)) {
      const authInfo: AuthenticationInfo = JSON.parse(localStorage.getItem(KEY_AUTHINFO));
      if (authInfo.role.toLowerCase() === Role.Admin.toLowerCase()) {
        this.showItem = true;
      } else {
        this.showItem = false;
      }
    } else {
      this.showItem = false;
    }
  }

}
