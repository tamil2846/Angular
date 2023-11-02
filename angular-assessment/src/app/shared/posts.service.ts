import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import { map} from "rxjs/operators";
import {NzMessageService} from "ng-zorro-antd/message";
import {HelperFunctionService} from "./helper-function.service";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private router:Router,
              private http:HttpClient,
              private message: NzMessageService,
              private helperService:HelperFunctionService) { }
  base_url:String='https://react-assignment-api.mallow-tech.com/api';

  //getPostList
  getPostList(pageNo:number,value:any, order:string){
    const url= value.length > 0 ?
      `${this.base_url}/posts?limit=10&page=${pageNo}&sort=name&order=${order}&search=${value}` :
      `${this.base_url}/posts?limit=10&page=${pageNo}&sort=name&order=${order}`;
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.get(url ,{ headers })
      .pipe(
        map((res:any)=> res),
        tap({
          next : ((res)=>res),
          error: ((error) => this.helperService.handleError(error))
          }),
      );
  }

  //userPost
  postBlog(value:any){
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('content', value.content);
    formData.append('image', value.image);
    const headers= new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
         Authorization: this.helperService.getLocalData('authorization'),
      });
    return this.http.post(`${this.base_url}/posts` , formData ,{ headers })
      .pipe(
        map((res:any)=> res),
        tap({
          next:(() => this.helperService.successMessage('Posts added Successfully')),
            error: ((error) => this.helperService.handleError(error))
          }
        )
      );
  }

  //deletePost
  deletePost(id:any):Observable<any>{
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.delete(`${this.base_url}/posts/${id}` ,{ headers })
      .pipe(
        map((res:any)=> res),
        tap({
            next:((res:any) => {this.router.navigate(['user/posts']),
              this.helperService.successMessage(res.message)}),
            error: ((error) => this.helperService.handleError(error))
          }
        )
      );
  }

  //editPost
  editPost(value:any, id:number){
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('content', value.content);
    if(typeof value.image === 'object') {
      formData.append('image', value.image);
    }
    formData.append('_method', 'patch');
    const headers= new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.post(`${this.base_url}/posts/${id}` , formData ,{ headers })
      .pipe(
        map((res:any)=> res),
        tap({
          next:((res:any)=>this.helperService.successMessage(res.message)),
            error: ((error) => this.helperService.handleError(error))
          }
        )
      );
  }

  //getBlog
  getBlog(id:any){
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.get(`${this.base_url}/posts/${id}` ,{ headers })
      .pipe(
        map((res:any)=> res),
        tap({
            error: ((error) => error.error.error==='Token Expired.' ?
              (localStorage.clear(), location.reload()) :
              error.status === 404 ?
                this.router.navigate(['/noMatch']) :
              this.message.error(`${error.status} Error`))
          }
        )
      );
  }

  //postPublish
  postPublish(id:number, isPublish:boolean){
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.post(`${this.base_url}/posts/${id}/publish/${isPublish}` ,{},{ headers })
      .pipe(
        map((res:any)=> res),
        tap({
          next:((res:any)=>this.helperService.successMessage(res.message)),
            error: ((error) => this.helperService.handleError(error))
          }
        )
      );
  }

}
