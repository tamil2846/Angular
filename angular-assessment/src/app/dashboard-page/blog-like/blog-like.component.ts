import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {actions} from "../../NgRx/actions";
import {HelperFunctionService} from "../../shared/helper-function.service";

@Component({
  selector: 'app-blog-like',
  templateUrl: './blog-like.component.html',
  styleUrls: ['./blog-like.component.scss']
})
export class BlogLikeComponent implements OnInit{
  @Input() Id:any;
  blogDetails:any;
  userDetails:any;
  liked:boolean=false;
  constructor(private store:Store<any>, private helperService:HelperFunctionService) {}

  ngOnInit(): void {
    this.store.select('store').subscribe((data:any)=>{
      this.blogDetails=data.publicPosts.filter((post:any)=>post.id===Number(this.Id))[0];
    });
    this.userDetails=this.helperService.getLocalData('userLogin');
  }

  handleLike(){
    // this.store.dispatch(actions.blogClap({id:this.blogDetails.id}))
    this.liked=!this.liked;
  }
}
