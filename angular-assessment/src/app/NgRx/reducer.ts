import {createReducer, on } from "@ngrx/store";
import { initialState } from './state'
import {actions} from "./actions";


const reducer=createReducer(
  initialState,
  on(actions.drawerOpen, (state, action) => {
    return {
      ...state,
      drawerVisible:true,
      hasEdit:action.hasEdit
    }
  }),
  on(actions.drawerClose, (state)=>{
    return{
      ...state,
      drawerVisible:false,
      hasEdit:false
    }
  }),
  on(actions.login, (state)=>{
    return{
      ...state,
      buttonLoader:true,
    }
  }),
  on(actions.loginSuccess , (state) => {
    return{
      ...state,
      buttonLoader:false,
    }
  }),on(actions.loginFailure, (state)=>{
    return{
      ...state,
      buttonLoader:false,
    }
  }),
  on(actions.register, (state)=>{
    return{
      ...state,
      buttonLoader:true,
    }
  }),
  on(actions.registerSuccess , (state) => {
    return{
      ...state,
      buttonLoader:false,
    }
  }),on(actions.registerFailure, (state)=>{
    return{
      ...state,
      buttonLoader:false,
    }
  }),
  on(actions.getPosts, (state)=>{
    return{
      ...state,
      tableLoading:true,
    }
  }),
  on(actions.getPostsSuccess , (state, action) => {
    return{
      ...state,
      tableLoading:false,
      posts:action.posts.data,
      tablePaginationData:action.posts.meta,
      blog:{},
    }
  }),on(actions.getPostsFailure, (state)=>{
    return{
      ...state,
      tableLoading:false,
    }
  }),
  on(actions.addPost, (state) => {
    return{
      ...state,
      tableLoading: true,
      buttonLoader: true,
    }
  }),
  on(actions.addPostSuccess, (state, action) => {
    return{
      ...state,
      tableLoading: false,
      buttonLoader: false,
      drawerVisible:false,
      posts:[...state.posts,action.post],
    }
  }),
  on(actions.addPostFailure, (state) => {
    return{
      ...state,
      tableLoading: false,
      buttonLoader: false,
    }
  }),
  on(actions.editPost, (state) => {
    return{
      ...state,
      blogLoading: true,
      buttonLoader: true,
    }
  }),
  on(actions.editPostSuccess, (state, action) => {
    return{
      ...state,
      blogLoading: false,
      buttonLoader: false,
      drawerVisible:false,
      posts:state.posts.map((post:any)=> post.id === action.id ?
        {...post, name:action.post.name,content:action.post.content,
          image_url:(typeof action.post.image === 'object' ? URL.createObjectURL(action.post.image) : action.post.image)}
        :post),
      blog: {...state.blog, name:action.post.name,content:action.post.content,
        image_url: (typeof action.post.image === 'object' ? URL.createObjectURL(action.post.image) : action.post.image)}
    }
  }),
  on(actions.editPostFailure, (state) => {
    return{
      ...state,
      blogLoading: false,
      buttonLoader: false,
    }
  }),
  on(actions.deletePost, (state) => {
    return{
      ...state,
      tableLoading: true,
    }
  }),
  on(actions.deletePostSuccess, (state, action) => {
    return{
      ...state,
      tableLoading: false,
      posts:state.posts.filter((post:any)=>post.id !== action.post?.post_id)
    }
  }),
  on(actions.deletePostFailure, (state) => {
    return{
      ...state,
      tableLoading: false,
    }
  }),
  on(actions.getBlog, (state) => {
    return{
      ...state,
      blogLoading: true,
    }
  }),
  on(actions.getBlogSuccess, (state, action) => {
    return{
      ...state,
      blogLoading: false,
      blog:action.blog
    }
  }),
  on(actions.getBlogFailure, (state) => {
    return{
      ...state,
      blogLoading: false,
    }
  }),
  on(actions.publishPost, (state) => {
    return{
      ...state,
      publishButtonLoader:true,
    }
  }),
  on(actions.publishPostSuccess, (state, action) => {
    return{
      ...state,
      publishButtonLoader:false,
      blog:{...state.blog, is_published:action.isPublish},
      posts: state.posts.map((post:any)=> post.id === action.id ? {...post, is_published:action.isPublish} : post )
    }
  }),
  on(actions.publishPostFailure, (state) => {
    return{
      ...state,
      publishButtonLoader:false,
    }
  }),
  on(actions.modelOpen, (state) => {
    return{
      ...state,
      modelVisible:true,
    }
  }),
  on(actions.modelClose, (state) => {
    return{
      ...state,
      modelVisible:false,
    }
  }),
  on(actions.profileUpdate, (state) => {
    return{
      ...state,
    }
  }),
  on(actions.profileUpdateSuccess, (state) => {
    return{
      ...state,
      modelVisible:false,
    }
  }),
  on(actions.profileUpdateFailure, (state) => {
    return{
      ...state,
    }
  }),
  on(actions.publicPost, (state) => {
    return{
      ...state,
      sideLoader: true,
    }
  }),
  on(actions.publicPostSuccess, (state, action) => {
    if(action.offSet === 1) {
      return {
        ...state,
        sideLoader: false,
        publicPosts: action.publicPost,
        hasMoreData: true,
      };
    }
      else {
        if(action.publicPost.length < 10) {
          return {
            ...state,
            sideLoader: false,
            publicPosts: [...state.publicPosts, ...action.publicPost],
            hasMoreData: false,
          };
        }
        else {
          return {
            ...state,
            sideLoader: false,
            hasMoreData: true,
            publicPosts: [...state.publicPosts, ...action.publicPost]
          }
        }
    }
  }),
  on(actions.publicPostFailure, (state) => {
    return{
      ...state,
      sideLoader: false,
    }
  }),
  on(actions.getPublishBlog, (state) => {
    return{
      ...state,
      publishBlogLoader:true,
    }
  }),
  on(actions.getPublishBlogSuccess, (state, action) => {
    return{
      ...state,
      publishBlogLoader:false,
      publishBlog:action.blog
    }
  }),
  on(actions.getPublishBlogFailure, (state) => {
    return{
      ...state,
      publishBlogLoader:false,
    }
  }),
  on(actions.addBlogComments, (state) => {
    return{
      ...state,
      commentsLoader:true,
    }
  }),
  on(actions.addBlogCommentsSuccess, (state, action) => {
    return{
      ...state,
      commentsLoader:false,
      publishBlog:{...state.publishBlog,comments:[...state.publishBlog.comments,...action.comment]}
    }
  }),
  on(actions.addBlogCommentsFailure, (state) => {
    return{
      ...state,
      commentsLoader:false,
    }
  }),
  on(actions.deleteBlogComments, (state) => {
    return{
      ...state,
      commentsLoader:true,
    }
  }),
  on(actions.deleteBlogCommentsSuccess, (state, action) => {
    return{
      ...state,
      commentsLoader:false,
      publishBlog:{...state.publishBlog,comments:state.publishBlog.comments.filter((comment:any) => comment.id !== action.id)}
    }
  }),
  on(actions.deleteBlogCommentsFailure, (state) => {
    return{
      ...state,
      commentsLoader:false,
    }
  }),
  on(actions.editBlogComments, (state) => {
    return{
      ...state,
      commentsLoader:true,
    }
  }),
  on(actions.editBlogCommentsSuccess, (state, action) => {
    return{
      ...state,
      commentsLoader:false,
      publishBlog:{...state.publishBlog,comments:state.publishBlog.comments.map((comments:any) =>
          comments.id === action.id ?  {...comments, comment:action.comment} : comments )}
    }
  }),
  on(actions.editBlogCommentsFailure, (state) => {
    return{
      ...state,
      commentsLoader:false,
    }
  }),
);

export function MainReducer(state:any,action:any) {
  return reducer(state, action)
}
