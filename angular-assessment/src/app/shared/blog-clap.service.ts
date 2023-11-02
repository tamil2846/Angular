import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {HelperFunctionService} from "./helper-function.service";

@Injectable({
  providedIn: 'root'
})
export class BlogClapService {
  constructor(private router:Router,private http:HttpClient, private helperService:HelperFunctionService) { }
  base_url:String='https://react-assignment-api.mallow-tech.com/api';

  //blogClaps
  blogClaps(id:number){
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.post(`${this.base_url}/posts/${id}/claps` ,'',{ headers })
      .pipe(
        map((res:any)=> res),
        tap({
          next : ((res:any)=>res),
          error: ((error:any) => this.helperService.handleError(error))
        }),
      );
  }
}
