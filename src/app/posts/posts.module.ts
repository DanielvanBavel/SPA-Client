import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostService } from './post.service';
import { PostsComponent } from './posts.component';


@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    PostService
  ]
})
export class PostsModule {}