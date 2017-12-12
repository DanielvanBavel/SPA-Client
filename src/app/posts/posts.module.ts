import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostService } from './post.service';
import { PostsComponent } from './posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from '../comments/comments.component';


@NgModule({
  declarations: [
    PostsComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  imports: [
    SharedModule
  ],
  providers: [
    PostService
  ]
})
export class PostsModule {}