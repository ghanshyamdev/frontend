import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../shared/services/http-calls.service';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel = { emailId: '', password: '' };
  model = { firstName: '', lastName: '', password: '', emailId: '' };
  showInvalidPassword = false;
  showSuccess: any;

  constructor(private service: HttpCallsService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(action: string) {
    action === 'login' ? this.loginCall() : this.signUpCall();   
  }

  loginCall() {
    this.service.login(this.loginModel)
      .then((data) => {
        this.router.navigate(['/landing']);
      })
      .catch((error) => {
        console.error('LoginComponent : loginCall : Error : ', error);
        this.router.navigate(['/']);
      });
  }

  signUpCall() {
    this.service.signUp(this.model)
      .then((data) => { 
        this.showSuccess = "Registered successfully";  
        this.loginModel.emailId = this.model.emailId;
        this.loginModel.password = this.model.password;
        this.loginCall();
      })
      .catch((error) => {
        this.showInvalidPassword = error.error.errorCauses[0].errorSummary;
      });
  }

}
