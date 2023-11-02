import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Store} from "@ngrx/store";
import {actions} from "../../NgRx/actions";
import {Observable} from "rxjs";
import {postsList, publishButtonLoader, tableLoading, tablePaginationData} from "../../NgRx/selector";
import {IPosts} from "../../shared/posts.interface";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges{
  constructor(public postService:PostsService, public store:Store<{store:any}>) {}
  posts!:Observable<any>;
  loading!:Observable<any>;
  tablePaginationData!:Observable<any>;
  id:any;
  pageNo:number=1;
  tableDirection:any='ascend';
  hasSearch:any;
  publishButtonLoader!:Observable<boolean>;
  listOfColumns: any = [
    {
      name: 'Post Name',
      width:'35%',
      sortOrder: this.tableDirection,
      click:true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      name: 'Created at',
      width:'23%',
      click:false,
    },
    {
      name: 'Updated at',
      width:'23%',
      click:false,
    }
  ];
  popUp:boolean=false;
  @Input() searchValue:any;
   actionVisible(value:any){
     this.id=value
   }
  actionHidden(){
     this.id=0
  }
  ngOnInit(): void {
    this.store.dispatch(actions.getPosts({
      pageNo:this.pageNo,
      value:'',
      order:this.tableDirection === 'descend' ? 'desc' :'asc'
      }));
    this.loading=this.store.select(tableLoading);
    this.posts=this.store.select(postsList);
    this.tablePaginationData=this.store.select(tablePaginationData);
    this.publishButtonLoader=this.store.select(publishButtonLoader);
  }
  ngOnChanges(changes: SimpleChanges): void {
     this.hasSearch=changes;
     if(!changes['searchValue'].firstChange)
    this.store.dispatch(actions.getPosts({
      pageNo:this.pageNo,
      value:changes['searchValue'].currentValue,
      order:this.tableDirection === 'descend' ? 'desc' :'asc'
    }));
  }
  handlePopUp(){
     this.popUp=true;
  }
  handleDelete(id:any){
    this.popUp=false;
    this.store.dispatch(actions.deletePost({value:id}))
    this.id=0
  }
  handlePublish(value:IPosts){
     this.store.dispatch(actions.publishPost({id:value.id,isPublish:!value.is_published}))
  }
  handleCancel(){
     this.popUp=false;
    this.id=0
  }
  handleChange(id:any){
    this.pageNo=id;
    this.store.dispatch(actions.getPosts({
      pageNo:this.pageNo,
      value:'',
      order:this.tableDirection === 'descend' ? 'desc' :'asc'
    }));
  }
  handleSort(){
    this.tableDirection=this.tableDirection === 'descend' ? 'ascend' :'descend';
      this.store.dispatch(actions.getPosts({
        pageNo: this.pageNo,
        value: this.hasSearch['searchValue'].currentValue ? this.hasSearch['searchValue'].currentValue : '',
        order: this.tableDirection === 'descend' ? 'desc' : 'asc'
      }));
  }
}
