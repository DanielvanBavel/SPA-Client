import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { GroupStartComponent } from './groups-start/group-start.component';
import { GroupsComponent } from './groups.component';
import { GroupEditComponent } from './groups-edit/group-edit.component';
import { PostsComponent } from '../posts/posts.component';

const groupsRoutes: Routes = [
  {
    path: '', component: GroupsComponent, children: [
      { path: '', component: GroupStartComponent },
      { path: ':id', component: PostsComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(groupsRoutes)
  ],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
