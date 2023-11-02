import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HelperFunctionService} from "../shared/helper-function.service";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit{
  constructor(private router:Router, private helperService:HelperFunctionService) {
  }
  userDetails:any;
  ngOnInit(): void {
    this.userDetails=this.helperService.getLocalData('userLogin');
    if(Object.keys(this.userDetails).length > 0){
      this.router.navigate(['/user'])
    }
  }
}
