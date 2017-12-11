import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from './post.model';
import { PostService } from './post.service';
import { BaseComponent } from '../shared/basecomponent.class';
import { User } from '../user/user.model';

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

    onSubmit(form: NgForm) {

        //const value = form.value;
        //const guid = Guid.create();
        //const username = "username ingelogde gebruiker";

        //const newPost = new Post(_id, username, user_id = "", value.content, Date.now(), comments = [] );
    }
}