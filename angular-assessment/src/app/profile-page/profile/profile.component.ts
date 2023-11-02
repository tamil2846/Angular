import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {actions} from "../../NgRx/actions";
import {LoginService} from "../../shared/login.service";
import {Router} from "@angular/router";
import {HelperFunctionService} from "../../shared/helper-function.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  userDetails:any;
  constructor(public store:Store<{store:any}>,
              public loginService:LoginService,
              private router:Router,
              private helperService:HelperFunctionService
              ) {}
  ngOnInit(): void {
    this.userDetails=this.helperService.getLocalData('userLogin');
    this.loginService.validateUser().subscribe((res) =>{
      this.helperService.setLocalData('userLogin', res);
    });
  }
  handleEdit(){
    this.store.dispatch(actions.modelOpen())
  }
  handleLogout(){
    this.loginService.userLogout().subscribe((res:any)=>{
      localStorage.clear(),this.helperService.successMessage(res.message), this.router.navigate(['/login'])});
  }
}
