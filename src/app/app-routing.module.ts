import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PostsComponent } from './posts/posts.component';
import {LoginComponent} from './login/login.component';
import { GroupsComponent } from './groups/groups.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'timeline', component: PostsComponent },
  { path: 'groups', loadChildren: './groups/groups.module#GroupsModule'},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}