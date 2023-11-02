import {Component, OnInit} from '@angular/core';
import {actions} from "../../NgRx/actions";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {hasEdit} from "../../NgRx/selector";
import {LoginService} from "../../shared/login.service";
import {HelperFunctionService} from "../../shared/helper-function.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  constructor(public store:Store<{store:any}>,
              public loginService:LoginService,
              private helperService:HelperFunctionService,
             ) {}
  hasEdit!:Observable<any>;
  searchValue:any;
  ngOnInit(): void {
    this.hasEdit=this.store.select(hasEdit);
    this.loginService.validateUser().subscribe((res) =>{
      this.helperService.setLocalData('userLogin', res);
    });
  }
  setData(value:any){
   this.searchValue=value;
  }

  drawerOpen(){
    this.store.dispatch(actions.drawerOpen({hasEdit:false}));
  }
}
