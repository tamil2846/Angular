import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {modelVisible} from "../../NgRx/selector";
import {actions} from "../../NgRx/actions";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {act} from "@ngrx/effects";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit{
  constructor(public store:Store<{store:any}>,private form: UntypedFormBuilder) {}
  modelVisible!:Observable<any>;
  validateForm!: UntypedFormGroup;
  image:any;
  userDetails:any;
  ngOnInit(): void {
    this.userDetails=JSON.parse(localStorage.getItem('userLogin') || '{}' );
    this.modelVisible=this.store.select(modelVisible);
    this.validateForm = this.form.group({
      first_name: [this.userDetails.body.first_name, [Validators.required]],
      last_name: [this.userDetails.body.last_name, [Validators.required]],
      profile_url: [this.userDetails.body.profile_url, [Validators.required]],
    });
  }

  handleCancel(){
    this.store.dispatch(actions.modelClose())
  }

  handleChange({ file }: any): void {
    const status = file.status;
    if (status !== 'uploading') {
      this.image=file;
    }
    if (status === 'done') {
      console.log(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.image=file;
      console.log(`${file.name} file upload failed.`);
    }
  }
  handleOk(){
    if (this.validateForm.valid) {
      this.store.dispatch(actions.profileUpdate({value:{...this.validateForm.value,profile_url:this.image.originFileObj}}))
      this.validateForm.reset();
      this.store.dispatch(actions.modelClose())
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
