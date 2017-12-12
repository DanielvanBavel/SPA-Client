import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { PostService } from "../posts/post.service";
import { BaseComponent } from "../shared/basecomponent.class";
import { NgForm } from "@angular/forms";
import { Post } from "../posts/post.model";
import { Comment } from "../comments/comment.model";

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html'
})
  
export class CommentsComponent extends BaseComponent implements OnInit {

	@ViewChild('f')
	form: NgForm;
	
	postObject: Post;
	posts: Post[];
	comment: Comment;

	private id: string;

	@Input()
	public postId: string;

	private editMode = false;

	constructor(private postService: PostService) {
		super();
	}
	
	ngOnInit() {
		this.postService.getPosts().subscribe((response) => {
            this.posts = response;
		});
	}

	onSubmit(form: NgForm) {
		const value = form.value;

		if(this.editMode) {
			// edit comment
		}
		else {
			const { id, username, reply, time} = form.value;
			const comment = new Comment(id, "sjaak", value.reply, Date.now());
			comment._id = this.id;
			this.comment = comment;

			const currentPost =  this.postService.getPost(this.postId).subscribe((response) => {
				this.postObject = response;
				this.postObject.comments.push(this.comment);

				this.postService.updatePost(this.postId, this.postObject).subscribe((response) => {
					this.postService.postUpdated.next(response);
				});
			});			
		}
		this.onClear();
	}

	onClear() {
		this.form.reset();
	}
}