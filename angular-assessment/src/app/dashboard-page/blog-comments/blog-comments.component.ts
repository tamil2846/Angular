import {Component, Input} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../shared/login.service";
import {Store} from "@ngrx/store";
import {actions} from "../../NgRx/actions";
import {Observable} from "rxjs";
import {commentsLoader, getpublishBlog, publicPosts} from "../../NgRx/selector";
import {HelperFunctionService} from "../../shared/helper-function.service";


@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss']
})
export class BlogCommentsComponent {
  validateCommentForm!: UntypedFormGroup;
  blog!:Observable<any>;
  commentsLoader!:Observable<any>;
  userDetails:any;
  commentId:any;
  iconVisibleId:any;
  @Input() id:any;
  hasEdit:boolean=false;
  constructor(private form: UntypedFormBuilder, public loginService:LoginService, private store:Store<any>,
              private helperService:HelperFunctionService) {}

  ngOnInit(): void {
    this.validateCommentForm = this.form.group({
      comment: [null, [Validators.required]]
    });
    this.blog=this.store.select(getpublishBlog);
    this.userDetails=this.helperService.getLocalData('userLogin');
    this.commentsLoader=this.store.select(commentsLoader);
  }

  gridStyle = {
    width: '100%',
  };

  submitForm(): void {
    if (this.validateCommentForm.valid) {
      if(this.hasEdit){
        this.store.dispatch(actions.editBlogComments({id:this.commentId,value:this.validateCommentForm.value}));
        this.hasEdit=false;
      }
      else {
        this.store.dispatch(actions.addBlogComments({id:this.id, value:this.validateCommentForm.value}));
      }
      this.validateCommentForm.reset();
    } else {
      Object.values(this.validateCommentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  handleDelete(id:number){
    this.store.dispatch(actions.deleteBlogComments({id:id}))
  }

  handleEdit(value:any){
    this.hasEdit=true;
    this.commentId=value.id;
    this.validateCommentForm = this.form.group({
      comment: [value.comment, [Validators.required]]
    });
  }

  handleCancel(){
    this.hasEdit=false;
    this.validateCommentForm = this.form.group({
      comment: [null, [Validators.required] ]
    });
  }

  handleIcon(id:any){
    this.iconVisibleId=id;
  }
}
