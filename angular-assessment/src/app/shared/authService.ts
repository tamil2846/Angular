import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {NzMessageService} from "ng-zorro-antd/message";
import {HelperFunctionService} from "./helper-function.service";

@Injectable()
export class AuthService implements CanActivate{
  constructor(private router: Router, private message:NzMessageService,private helperService:HelperFunctionService) {}

  canActivate():boolean{
    const userLogin=this.helperService.getLocalData('userLogin');
    if(Object.keys(userLogin).length === 0){
      this.router.navigate(['/login']);
      this.message.warning('Please login to access a private route');
      return false;
    }
    else {
      return true;
    }
  }
}
