import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GroupService } from '../groups/group.service';
import { CommentsComponent } from './comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
export class CommentsModule {}