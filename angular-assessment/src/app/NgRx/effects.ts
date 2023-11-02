import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../shared/posts.service";
import {actions} from "./actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {IPosts} from "../shared/posts.interface";
import {ProfileService} from "../shared/profile.service";
import {PublicPostService} from "../shared/public-post.service";
import {CommentsService} from "../shared/comments.service";
import {of} from "rxjs";
import {BlogClapService} from "../shared/blog-clap.service";
import {LoginService} from "../shared/login.service";


@Injectable()

export class Effects {
  constructor(private action:Actions,
              private postService:PostsService,
              private profileService:ProfileService,
              private publicPostService:PublicPostService,
              private commentsService:CommentsService,
              private blogClapService:BlogClapService,
              private loginService:LoginService) {}

  //login
  login=createEffect(()=>{
    return this.action.pipe(
      ofType(actions.login),
      mergeMap((action)=>{
        return this.loginService.userLogin(action.value)
          .pipe(
            map((post:IPosts[]) =>{
              return  actions.loginSuccess()
            }),
            catchError(() => {
              return of(actions.loginFailure());
            })
          );
      })
    )
  });

  //register
  register=createEffect(()=>{
    return this.action.pipe(
      ofType(actions.register),
      mergeMap((action)=>{
        return this.loginService.userRegister(action.value)
          .pipe(
            map((post:IPosts[]) =>{
              return  actions.registerSuccess()
            }),
            catchError(() => {
              return of(actions.registerFailure());
            })
          );
      })
    )
  });

  //getpost
  getpost=createEffect(()=>{
    return this.action.pipe(
      ofType(actions.getPosts),
      mergeMap((action)=>{
        return this.postService.getPostList(action.pageNo,action.value ,action.order)
          .pipe(
          map((post:IPosts[]) =>{
            return  actions.getPostsSuccess({posts:post})
          }),
          catchError(() => {
          return of(actions.getPostsFailure());
        })
        );
      })
    )
  });

  //addPost
  addPost=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.addPost),
      mergeMap((action)=>{
        return this.postService.postBlog(action.value)
          .pipe(
          map((post:IPosts[]) =>{
            return  actions.addPostSuccess({post:post})
          }),
            catchError(() => {
              return of(actions.addPostFailure());
            })
        );
      })
    )
  });

  //editPost
    editPost=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.editPost),
      mergeMap((action)=>{
        return this.postService.editPost(action.value, action.id)
          .pipe(
            map((post:any) =>{
              return  actions.editPostSuccess({post:action.value, id:action.id})
            }),
            catchError(() => {
              return of(actions.editPostFailure());
            })
          );
      })
    )
  });

  //deletePost
  deletePost=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.deletePost),
      mergeMap((action)=>{
        return this.postService.deletePost(action.value)
          .pipe(
            map((post:IPosts[]) =>{
              return  actions.deletePostSuccess({post:post})
            }),
            catchError(() => {
              return of(actions.deletePostFailure());
            })
          );
      })
    )
  });

  //getBlog
  getBlog=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.getBlog),
      mergeMap((action)=>{
        return this.postService.getBlog(action.id)
          .pipe(
            map((post:IPosts[]) =>{
              return  actions.getBlogSuccess({blog:post})
            }),
            catchError(() => {
              return of(actions.getBlogFailure());
            })
          );
      })
    )
  });

  //publishPost
  publishblog=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.publishPost),
      mergeMap((action)=>{
        return this.postService.postPublish(action.id, action.isPublish)
          .pipe(
            map((post) =>{
              return  actions.publishPostSuccess({id:action.id, isPublish:action.isPublish})
            }),
            catchError(() => {
              return of(actions.publishPostFailure());
            })
          );
      })
    )
  });


  //profileUpdate
  profileUpdate=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.profileUpdate),
      mergeMap((action)=>{
        return this.profileService.profileChanges(action.value)
          .pipe(
            map((post) =>{
              return  actions.profileUpdateSuccess()
            }),
            catchError(() => {
              return of(actions.profileUpdateFailure());
            })
          );
      })
    )
  });

  //publicPost
  publicPost=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.publicPost),
      mergeMap((action)=>{
        return this.publicPostService.getPublishPost(action.offSet,action.value)
          .pipe(
            map((posts) =>{
              return  actions.publicPostSuccess({publicPost:posts, offSet:action.offSet})
            }),
            catchError(() => {
              return of(actions.publicPostFailure());
            })
          );
      })
    )
  });

  //publicBlog
  getPublishBlog=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.getPublishBlog),
      mergeMap((action)=>{
        return this.publicPostService.publishBlog(action.id)
          .pipe(
            map((blog) =>{
              return  actions.getPublishBlogSuccess({blog:blog})
            }),
            catchError(() => {
              return of(actions.getPublishBlogFailure());
            })
          );
      })
    )
  });

  // addComments
  addBlogComments=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.addBlogComments),
      mergeMap((action)=>{
        return this.commentsService.addComments(action.id,action.value)
          .pipe(
            map((comment) =>{
              return  actions.addBlogCommentsSuccess({comment:comment})
            }),
            catchError(() => {
              return of(actions.addBlogCommentsFailure());
            })
          );
      })
    )
  });

  // deleteBlogComments
  deleteBlogComments=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.deleteBlogComments),
      mergeMap((action)=>{
        return this.commentsService.deleteComents(action.id)
          .pipe(
            map((comment) =>{
              return  actions.deleteBlogCommentsSuccess({id: comment.comment_id})
            }),
            catchError(() => {
              return of(actions.deleteBlogCommentsFailure());
            })
          );
      })
    )
  });

  // editBlogComments
  editBlogComments=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.editBlogComments),
      mergeMap((action)=>{
        return this.commentsService.editComents(action.id, action.value)
          .pipe(
            map((comment) =>{
              return  actions.editBlogCommentsSuccess({id: action.id, comment:action.value.comment})
            }),
            catchError(() => {
              return of(actions.editBlogCommentsFailure());
            })
          );
      })
    )
  });

  // blogClap
  blogClap=createEffect(() =>{
    return this.action.pipe(
      ofType(actions.blogClap),
      mergeMap((action)=>{
        return this.blogClapService.blogClaps(action.id)
          .pipe(
            map((comment) =>{
              return  actions.blogClapSuccess()
            }),
            catchError(() => {
              return of(actions.blogClapFailure());
            })
          );
      })
    )
  });
}
