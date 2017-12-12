import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from './post.model';
import { PostService } from './post.service';
import { BaseComponent } from '../shared/basecomponent.class';
import { User } from '../user/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  providers: [PostService]
})

export class PostsComponent extends BaseComponent implements OnInit {

    @ViewChild('f')
	public form: NgForm;
    private id: string;

    private editMode = false;    
    public posts: Post[];
    public post: Post;

    constructor(private postService: PostService) {
        super();
    }

    ngOnInit() {
        this.postService.getPosts().subscribe((response) => {
            this.posts = response;
        });

        this.postService.postUpdated.subscribe((post) => {
            const index = this.posts.findIndex(x => x._id === post._id);
            if(index === -1) {
                this.posts.push(post);
            }
            else {
                this.posts[index] = post;
            }          
        });
    }

    onSubmit(form: NgForm) {
        const { id, user_id, username, content, time, comments } = form.value;
        const post = new Post(id, '5a2550ca5179b81be0241339', 'henkie', content, Date.now(), []);        
        post._id = this.id;

        if(this.editMode) {
            // edit
        }  
        else {
            this.postService.addPost(post).subscribe((response) => {
                this.posts.push(response);
            });
        }
        this.onClear();       
    }

    onClear() {
		this.form.reset();
    }
    
    onDeletePost(id) {
        this.postService.deletePost(id).subscribe(() => {
            const index = this.posts.findIndex(x => x._id === id);
            this.posts.splice(index, 1);
        });
    }

    onDeleteComment(postId, commentId) {

		const currentPost =  this.postService.getPost(postId).subscribe((response) => {
            this.post = response;

            const index = this.post.comments.findIndex(x => x._id === commentId);
            this.post.comments.splice(index, 1);

            this.postService.updatePost(postId, this.post).subscribe((response) => {
                this.postService.postUpdated.next(response);
            });
		});
    }
}