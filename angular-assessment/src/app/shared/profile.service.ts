import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {LoginService} from "./login.service";
import {HelperFunctionService} from "./helper-function.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private router:Router,
              private http:HttpClient,
              public loginService:LoginService,
              private helperService:HelperFunctionService) { }
  base_url:String='https://react-assignment-api.mallow-tech.com/api';

  //profileChanges
  profileChanges(value:any){
    const formData = new FormData();
    formData.append('first_name', value.first_name);
    formData.append('last_name', value.last_name);
    formData.append('image', value.profile_url);
    formData.append('_method', 'patch');
    const headers= new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: this.helperService.getLocalData('authorization'),
    });
    return this.http.post(`${this.base_url}/update/profile` , formData ,{ headers })
      .pipe(
        map((res:any)=>res),
        tap({
            next:(()=>this.loginService.validateUser().subscribe((res) =>{
                this.helperService.setLocalData('userLogin', res),
                this.helperService.successMessage(`Profile Update SuccessFully`),
                location.reload()
            })),
            error: ((error:any) => this.helperService.handleError(error))
          }
        )
      );
  }
}
