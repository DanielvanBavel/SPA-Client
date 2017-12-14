import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from '../comments/comments.component';
import { GroupService } from '../groups/group.service';


@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    GroupService
  ]
})
export class PostsModule {}