import {Component, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {LoginService} from "../shared/login.service";
import {Store} from "@ngrx/store";
import {actions} from "../NgRx/actions";
import {Observable} from "rxjs";
import {buttonLoader} from "../NgRx/selector";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  constructor(private form: UntypedFormBuilder, public loginService:LoginService, private store:Store<any>) {}
  validateForm!: UntypedFormGroup;
  response:any;
  counter:any;
  autoTips: Record<string, Record<string, string>> = {
    default: {
      email: 'The input is not valid email'
    }
  };
  buttonLoader!:Observable<boolean>;
  submitForm(): void {
    if (this.validateForm.valid) {
      this.store.dispatch(actions.login({value:this.validateForm.value}));
      this.validateForm.reset();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  ngOnInit(): void {
    this.validateForm = this.form.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
    this.buttonLoader=this.store.select(buttonLoader);
  }
}
