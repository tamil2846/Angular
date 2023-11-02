import {NgModule, isDevMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ScrollingModule } from '@angular/cdk/scrolling';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {DemoNgZorroAntdModule} from "./ng-zorro.module";
import { StoreModule } from '@ngrx/store';
import { ContentPageComponent } from './content-page/content-page.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard-page/dashboard/dashboard.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { PostsComponent } from './posts-page/posts/posts.component';
import { TableComponent } from './posts-page/table/table.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MainReducer} from "./NgRx/reducer";
import { DrawerComponent } from './shared/drawer/drawer.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { EffectsModule } from '@ngrx/effects';
import {Effects} from "./NgRx/effects";
import { ModelComponent } from './shared/model/model.component';
import { DashboardSiderComponent } from './dashboard-page/dashboard-sider/dashboard-sider.component';
import { DashboardContentComponent } from './dashboard-page/dashboard-content/dashboard-content.component';
import { BlogCommentsComponent } from './dashboard-page/blog-comments/blog-comments.component';
import { SearchComponent } from './shared/search/search.component';
import {AuthService} from "./shared/authService";
import { BlogLikeComponent } from './dashboard-page/blog-like/blog-like.component';
import { NoMatchComponent } from './no-match/no-match.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    ContentPageComponent,
    LoginRegisterComponent,
    HeaderComponent,
    DashboardComponent,
    ProfileComponent,
    PostsComponent,
    TableComponent,
    DrawerComponent,
    BlogPageComponent,
    ModelComponent,
    DashboardSiderComponent,
    DashboardContentComponent,
    BlogCommentsComponent,
    SearchComponent,
    BlogLikeComponent,
    NoMatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ store : MainReducer}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([Effects]),
    ScrollingModule,
    CdkVirtualScrollViewport
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
