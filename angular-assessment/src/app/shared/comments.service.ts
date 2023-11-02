import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {HelperFunctionService} from "./helper-function.service";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http:HttpClient, private helperService:HelperFunctionService) { }
  base_url:String='https://react-assignment-api.mallow-tech.com/api';

  // addComments
    addComments(id:number,value:any){
    const headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.post(`${this.base_url}/posts/${id}/comments` , value ,{ headers })
      .pipe(
        map((res:any)=>res),
        tap({
            next:(()=>this.helperService.successMessage(`Comments added SuccessFully`)),
            error: ((error:any) => this.helperService.handleError(error))
          }
        )
      );
  }

  // deleteComments
  deleteComents(id:number){
    const headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.delete(`${this.base_url}/posts/comments/${id}`  ,{ headers })
      .pipe(
        map((res:any)=>res),
        tap({
            next: ((res:any) => this.helperService.successMessage(`${res.message} SuccessFully`)),
            error: ((error:any) => this.helperService.handleError(error))
          }
        )
      );
  }

  // deleteComments
  editComents(id:number, value:any){
    const headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.patch(`${this.base_url}/posts/comments/${id}`, value  ,{ headers })
      .pipe(
        map((res:any)=>res),
        tap({
            next: ((res:any) => this.helperService.successMessage(res.message)),
            error: ((error:any) => this.helperService.handleError(error))
          }
        )
      );
  }
}
