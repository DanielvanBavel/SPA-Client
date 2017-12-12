import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostService } from '../posts/post.service';
import { CommentsComponent } from './comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CommentsComponent,
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
export class CommentsModule {}