import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {getpublishBlog, publicPosts, publishBlogLoader} from "../../NgRx/selector";

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit{
  constructor(private store:Store<{store:any}>) {}
  publishBlog!:Observable<any>;
  publishBlogLoader!:Observable<any>;
  publishPosts!:Observable<any>;
  ngOnInit(): void {
    this.publishBlog=this.store.select(getpublishBlog);
    this.publishBlogLoader=this.store.select(publishBlogLoader);
    this.publishPosts=this.store.select(publicPosts);
  }
}
