import { Injectable } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionService {

  constructor(private message:NzMessageService) { }

  //set data to the local storage
  setLocalData(key:string,value:any){
    return localStorage.setItem(key,JSON.stringify(value));
  }

  //Get Data from the local storage
  getLocalData(key:string){
    return JSON.parse(localStorage.getItem(key) || '{}' );
  }

  //handleError
  handleError(error:any){
    return error.error.error==='Token Expired.' ?
      (localStorage.clear(), location.reload(), this.errorMessage(error.error.error)) :
      this.errorMessage(`${error.status} Error`);
  }

  //SuccessMessage
  successMessage(message:string){
    return this.message.success(message);
  }

  //errorMessage
  errorMessage(message:string){
    return this.message.error(message);
  }
}
