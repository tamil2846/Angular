import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {ContentPageComponent} from "./content-page/content-page.component";
import {LoginRegisterComponent} from "./login-register/login-register.component";
import {DashboardComponent} from "./dashboard-page/dashboard/dashboard.component";
import {PostsComponent} from "./posts-page/posts/posts.component";
import {ProfileComponent} from "./profile-page/profile/profile.component";
import {BlogPageComponent} from "./blog-page/blog-page.component";
import {AuthService} from "./shared/authService";
import {NoMatchComponent} from "./no-match/no-match.component";

const routes: Routes = [
  {path: '', component:LoginRegisterComponent, children: [
      {path:'login', component: LoginPageComponent},
      {path:'register', component: RegisterPageComponent},
      {path:'', redirectTo:'login', pathMatch:'full'},
    ]},
  {path:'user', component:ContentPageComponent,canActivate:[AuthService],
    children:[
      {path: 'dashboard', component:DashboardComponent},
      {path: 'posts',
        children: [
          {path:'', component:PostsComponent },
        ] },
      {path: 'profile', component:ProfileComponent},
      {path:'', redirectTo:'dashboard', pathMatch:'prefix'},
    ]},
  {path:'post/:id', component:BlogPageComponent},
  {path:'**', component:NoMatchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
