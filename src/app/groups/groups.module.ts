import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { GroupService } from './group.service';
import { GroupsComponent } from './groups.component';
import { GroupStartComponent } from './groups-start/group-start.component';
import { GroupListComponent } from './groups-list/group-list.component';
import { CommonModule } from '@angular/common';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupItemComponent } from './groups-list/group-item/group-item.component';
import { PostsComponent } from '../posts/posts.component';
import { GroupEditComponent } from './groups-edit/group-edit.component';
import { CommentsComponent } from '../comments/comments.component';


@NgModule({
  declarations: [
    GroupsComponent,
    GroupStartComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupEditComponent,
    PostsComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    SharedModule
  ],
  providers: [
    GroupService
  ]
})
export class GroupsModule {}