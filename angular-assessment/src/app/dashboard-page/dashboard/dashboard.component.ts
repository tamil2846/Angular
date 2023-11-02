import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../shared/login.service";
import {HelperFunctionService} from "../../shared/helper-function.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private loginService:LoginService, private helperService:HelperFunctionService) {}
  ngOnInit(): void {
    this.loginService.validateUser().subscribe((res) =>{
      this.helperService.setLocalData('userLogin', res);
    });
  }
}
