import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { BaseComponent } from '../shared/basecomponent.class';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  providers: [PostService]
})

export class PostsComponent extends BaseComponent implements OnInit {
    public posts: Post[];

    constructor(private postService: PostService) {
        super();
    }

    ngOnInit() {
        this.postService.getPosts().subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }
}