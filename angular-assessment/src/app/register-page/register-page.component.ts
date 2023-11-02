import { Component } from '@angular/core';
import {FormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginService} from "../shared/login.service";
import {Store} from "@ngrx/store";
import {actions} from "../NgRx/actions";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  constructor(private form: FormBuilder, public loginService:LoginService, private store:Store<any>) {}
  validateForm!: UntypedFormGroup;
  autoTips: Record<string, Record<string, string>> = {
    default: {
      email: 'The input is not valid email',
    }
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      this.store.dispatch(actions.register({value:this.validateForm.value}));
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

  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {
    this.validateForm = this.form.group({
      first_name:[null, [Validators.required]],
      last_name:[null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation:[null, [Validators.required, this.confirmValidator]]
    });
  }
}
