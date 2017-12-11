import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostService } from './post.service';
import { PostsComponent } from './posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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