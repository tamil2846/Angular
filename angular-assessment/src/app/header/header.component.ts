import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../shared/login.service";
import {HelperFunctionService} from "../shared/helper-function.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  loginDetails:any;
  constructor(private router:Router, public loginService:LoginService,
              private helperService:HelperFunctionService) {}
  ngOnInit(): void {
    this.loginDetails=this.helperService.getLocalData('userLogin');
  }

  handleLogout(){
    this.loginService.userLogout().subscribe((res:any)=>{
      localStorage.clear(),this.helperService.successMessage(res.message), this.router.navigate(['/login'])});
  }
}
