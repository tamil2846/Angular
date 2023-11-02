import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {map} from "rxjs/operators";
import {HelperFunctionService} from "./helper-function.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private  http:HttpClient,
              private router:Router,
              private message:NzMessageService,
              private helperService:HelperFunctionService
              ) { }
   baseUrl:string='https://react-assignment-api.mallow-tech.com/api';
  // handleError
  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('Incorrect URL', error.url);
    } else if( error.status>=500 && error.status<600) {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
  }

  // userRegistration
  userRegister(value:any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      })
    };
    return this.http.post(`${this.baseUrl}/register`, value, httpOptions)
      .pipe(
        map((res:any)=>(this.helperService.setLocalData('authorization',res.headers.get('Authorization')), res)),
        tap({
            next: ((data) =>
            {this.helperService.setLocalData('userLogin',data), this.router.navigate(['/user'])}),
            error: ((error) => this.handleError(error))
          }
        )
      );
  }


  // userLogin
  userLogin(value:any): Observable<any>{
    this.helperService.setLocalData('loginDetails', value);
    const headers= new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }),
      observe= 'response';
    return this.http.post(`${this.baseUrl}/login` , value , {headers , observe})
      .pipe(
        map((res:any)=>(this.helperService.setLocalData('authorization',res.headers.get('Authorization')), res)),
        tap({
            next: ((data:any) =>
            {this.helperService.setLocalData('userLogin', data), this.router.navigate(['/user'])}),
            error: (() =>this.message.error(`Please provide valid UserName and Password`))
          }
        )
      );
  }

  // userLogout
  userLogout(): Observable<any>{
    const headers= new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: this.helperService.getLocalData('authorization'),
      });
    return this.http.delete(`${this.baseUrl}/logout` ,  {headers})
  }

  // validateUser
  validateUser(): Observable<any>{
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    }),
      observe= 'response';
    return this.http.get(`${this.baseUrl}/validate-user` ,  {headers,observe})
      .pipe(
        tap({
            error: ((error:any) => this.helperService.handleError(error))
          }
        )
      );
  }
}
