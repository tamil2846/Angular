import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {buttonLoader, getDrawerVisible, hasEdit} from "../../NgRx/selector";
import {Observable} from "rxjs";
import {actions} from "../../NgRx/actions";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {PostsService} from "../posts.service";
import {Observer} from "rxjs";
import {HelperFunctionService} from "../helper-function.service";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements  OnInit, OnChanges{
  constructor(public store:Store<{store:any}>,
              private form: FormBuilder,
              public postService:PostsService,
              private helperService:HelperFunctionService) {}
  drawerVisible!:Observable<any>;
  blog:any={};
  blogDetails!: UntypedFormGroup;
  image:any;
  uploadVisible!:Observable<any>;
  fileList:any;
  buttonLoader!:Observable<boolean>;
  @Input() hasEdit:any;
  ngOnInit(): void {
    this.drawerVisible=this.store.select(getDrawerVisible);
    this.store.select('store').subscribe((data)=>this.blog=data.blog);
    this.uploadVisible=this.store.select(hasEdit);
    this.buttonLoader=this.store.select(buttonLoader);
    this.blogDetails = this.form.group({
      name:[null, [Validators.required]],
      image:[null, [Validators.required]],
      content: [null, [Validators.required]]
    });
    this.fileList=[];
  }
  ngOnChanges(changes:any): void {
    if(Boolean(changes.hasEdit.currentValue) === true){
      this.blogDetails = this.form.group({
        name:[this.blog.name, [Validators.required]],
        image:[this.blog.image_url, [Validators.required]],
        content: [this.blog.content, [Validators.required]]
      });
      this.fileList= [
        {
          uid: '-1',
          name: this.blog.name,
          status: 'done',
          url: this.blog.image_url
        }
      ];
    }
  }

  beforeUpload = (file:any) : Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.helperService.errorMessage('You can only upload JPG or PNG file!');
        return;
      }
      else {
        if (file.size > 2e+6) {
          this.helperService.errorMessage('Image must smaller than 2MB!');
          return;
        }
        else{
          observer.next(isJpgOrPng && file.size < 2e+6);
        }
      }
    });
  handleChange({ file }: any): void {
    const status = file.status;
      if (status !== 'uploading') {
        this.image = file;
      }
      if (status === 'done') {
        console.log(`${file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.image = file;
        console.log(`${file.name} file upload failed.`);
      }
  }
  handleClose(): void {
    this.store.dispatch(actions.drawerClose())
  }
  submitForm(){
    if (this.blogDetails.valid) {
      const submitData={...this.blogDetails.value,
        image:(!this.image?.originFileObj ? this.blogDetails.value['image'] : this.image.originFileObj )};
      if(Object.keys(this.blog).length>0){
        this.store.dispatch(actions.editPost({value:submitData, id:this.blog.id}))
      }
      else{
        this.store.dispatch(actions.addPost({value:submitData}))
      }
    } else {
      Object.values(this.blogDetails.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
