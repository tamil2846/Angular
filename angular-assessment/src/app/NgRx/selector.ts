import {createFeatureSelector, createSelector} from "@ngrx/store";


const getState=createFeatureSelector<any>('store');


export const getDrawerVisible= createSelector(getState, (state)=> state.drawerVisible);

export const tableLoading= createSelector(getState, (state)=> state.tableLoading);

export const postsList=createSelector(getState, (state)=>state.posts);

export const blog=createSelector(getState, (state)=>state.blog);

export const blogLoading=createSelector(getState, (state)=>state.blogLoading);

export const buttonLoader=createSelector(getState, (state)=>state.buttonLoader);

export const publishButtonLoader=createSelector(getState, (state)=>state.publishButtonLoader);

export const hasEdit=createSelector(getState, (state)=>state.hasEdit);

export const modelVisible=createSelector(getState, (state)=>state.modelVisible);

export const publicPosts=createSelector(getState, (state)=>state.publicPosts);

export const getpublishBlog=createSelector(getState, (state)=>state.publishBlog);

export const publishBlogLoader=createSelector(getState, (state)=>state.publishBlogLoader);

export const commentsLoader=createSelector(getState, (state)=>state.commentsLoader);

export const hasMoreData=createSelector(getState, (state)=>state.hasMoreData);

export const tablePaginationData=createSelector(getState, (state)=>state.tablePaginationData);

export const sideLoader=createSelector(getState, (state)=>state.sideLoader);






