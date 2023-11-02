import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {blog, blogLoading, hasEdit, publishButtonLoader} from "../NgRx/selector";
import {Observable} from "rxjs";
import {actions} from "../NgRx/actions";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit{
  constructor(public router:Router, public getValue:ActivatedRoute,private store:Store<{store:any}>) {}
  id:any;
  blog!:Observable<any>;
  loading!:Observable<any>;
  hasEdit!:Observable<any>;
  publishButtonLoader!:Observable<any>;
  ngOnInit(): void {
    this.id=Number(this.getValue?.snapshot?.params['id']);
    this.store.dispatch(actions.getBlog({id:this.id}));
    this.blog=this.store.select(blog);
    this.loading=this.store.select(blogLoading);
    this.hasEdit=this.store.select(hasEdit);
    this.publishButtonLoader=this.store.select(publishButtonLoader);
  }

  handleBack(){
    this.router.navigate(['user/posts'])
  }

  handleDelete(){
    this.store.dispatch(actions.deletePost({value:this.id}))
  }
  handleEdit(){
    this.store.dispatch(actions.drawerOpen({hasEdit:true}))
  }

  hanblePublish(isPublish:boolean){
    this.store.dispatch(actions.publishPost({id:this.id, isPublish}))
  }
}
