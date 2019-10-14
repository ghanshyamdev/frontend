import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { KEY_ACCESSTOKEN, KEY_AUTHINFO, KEY_EXPIRESAT } from '../constants/constants';

export interface AuthenticationInfo {
  access_token: string;
  expires_in: number;
  role: string;
  scope: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  constructor(private http: HttpClient) {
  }

  login(loginInfo: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const apiUrl = `${ environment.BASE_URL }/${ environment.login }`;
      this.http.post(apiUrl, {email: loginInfo.emailId, password: loginInfo.password})
        .toPromise()
        .then((data: AuthenticationInfo) => {
          // -- Set the time that the access token will expire at
          const expiresAt = JSON.stringify((Number(data.expires_in * 1000)) + new Date().getTime());
          localStorage.setItem(KEY_EXPIRESAT, expiresAt);
          localStorage.setItem(KEY_ACCESSTOKEN, data.access_token);
          localStorage.setItem(KEY_AUTHINFO, JSON.stringify(data));
          resolve();
        })
        .catch((error) => {
          console.error('HttpCallsService : login : Error : ', error);
          reject();
        });
    });
  }

  signUp(signUpInfo: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const apiUrl = `${ environment.BASE_URL }/${ environment.signup }`;
      this.http.post(apiUrl,  { firstname: signUpInfo.firstName, lastname: signUpInfo.lastName, email: signUpInfo.emailId, password: signUpInfo.password }, {headers: header})
        .toPromise()
        .then((data) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  loadArticles(pno, size): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + localStorage.getItem(KEY_ACCESSTOKEN)
      });
      const apiUrl = `${ environment.BASE_URL }/articles/page/${pno}/records/${size}`;
      this.http.get(apiUrl, {headers: header})
        .toPromise()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteArticle(articleId: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + localStorage.getItem(KEY_ACCESSTOKEN)
      });
      const apiUrl = `${ environment.BASE_URL }/articles/${ articleId }`;
      this.http.delete(apiUrl, {headers: header})
        .toPromise()
        .then((data) => {
          resolve();
        })
        .catch((error) => {
          reject();
        });
    });
  }

  loadAllArticles(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + localStorage.getItem(KEY_ACCESSTOKEN)
      });
      const apiUrl = `${ environment.BASE_URL }/articles`;
      this.http.get(apiUrl, {headers: header})
        .toPromise()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  addNewArticle(formData: any) {
    return new Promise<any>((resolve, reject) => {
      const header: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ` + localStorage.getItem(KEY_ACCESSTOKEN),
      });
      const apiUrl = `${ environment.BASE_URL }/articles/new`;
      this.http.post(apiUrl,  formData, {headers: header})
        .toPromise()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


}
