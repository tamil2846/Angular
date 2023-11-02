import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {HelperFunctionService} from "./helper-function.service";

@Injectable({
  providedIn: 'root'
})
export class PublicPostService {
  constructor(private router:Router,private http:HttpClient, private helperService:HelperFunctionService) { }
  base_url:String='https://react-assignment-api.mallow-tech.com/api';

  //getPublishPost
  getPublishPost(id:number, value:string){
    const url= value.length>0 ? `${this.base_url}/public/posts?offset=${id}&search=${value}` :
      `${this.base_url}/public/posts?offset=${id}`;
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.get( url ,{ headers })
      .pipe(
        map((res:any)=>res),
        tap({
            error: ((error:any) => this.helperService.handleError(error))
          }
        )
      );
  }

  //getPublishBlog
  publishBlog(id:number){
    const headers= new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.get(`${this.base_url}/public/posts/${id}` ,{ headers })
      .pipe(
        map((res:any)=>res),
        tap({
            error: ((error:any) => this.helperService.handleError(error))
          }
        )
      );
  }
}
