import {Component, OnInit,ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {actions} from "../../NgRx/actions";
import {Observable} from "rxjs";
import {publicPosts, sideLoader} from "../../NgRx/selector";


@Component({
  selector: 'app-dashboard-sider',
  templateUrl: './dashboard-sider.component.html',
  styleUrls: ['./dashboard-sider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSiderComponent implements OnInit{
  constructor(public router:Router,
              public getValue:ActivatedRoute,
              private store:Store<{store:any}>,
              ) {}
  publicPosts!:Observable<any>;
  hasMoreData:any;
  previousId:number=0;
  offSet:number=1;
  searchValue:string='';
  sideLoader!:Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(actions.publicPost({
      offSet:this.offSet,
      value:this.searchValue
    }));
    this.publicPosts=this.store.select(publicPosts);
    this.store.select('store').subscribe((data)=>this.hasMoreData=data.hasMoreData);
    this.sideLoader=this.store.select(sideLoader)
  }
  handleBlog(id:number){
    this.store.dispatch(actions.getPublishBlog({id}))
  }
  gridStyle = {
    width:'100%',
  };

  handler(currentId:any, hasValue:any) {
    if(this.previousId < currentId && hasValue){
      this.previousId=currentId;
      this.store.dispatch(actions.publicPost({
        offSet:currentId+this.offSet,
        value:this.searchValue
      }));
    }
  }

  setData(value:any){
    this.previousId=0;
    this.searchValue=value;
    this.store.dispatch(actions.publicPost({offSet:this.offSet, value:this.searchValue}));
  }
}
