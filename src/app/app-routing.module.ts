import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PostsComponent } from './posts/posts.component';
import {LoginComponent} from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'timeline', component: PostsComponent, pathMatch: 'full'},
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