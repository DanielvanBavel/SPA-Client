import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { BaseComponent } from "../shared/basecomponent.class";
import { NgForm } from "@angular/forms";
import { Post } from "../posts/post.model";
import { Comment } from "../comments/comment.model";
import { GroupService } from "../groups/group.service";
import { Group } from "../groups/group.model";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html'
})
  
export class CommentsComponent extends BaseComponent implements OnInit {

	@ViewChild('f')
	form: NgForm;
	
	postObject: Post;
	groupObject: Group;
	posts: Post[];
	groups: Group[];
	comment: Comment;


	private id: string;
	private groupId: string;

	@Input()
	public postId: string;

	private editMode = false;

	constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) {
		super();
	}
	
	ngOnInit() {
		this.groupService.getGroups().subscribe((response) => {
			this.groups = response
		});

		this.subscription = this.route.params.subscribe((params: Params) => {
			this.groupId = params['id'];
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

			const currentGroup = this.groupService.getGroup(this.groupId).subscribe((response) => {
				this.groupObject = response;

				this.groupObject.posts.forEach(item => {
					if(item._id === this.postId) {
						item.comments.push(this.comment);
					}
				});

				this.groupService.updateGroup(this.groupId, this.groupObject).subscribe(() => {
					this.groupService.groupUpdated.next(response);
				});
			});				
		}		
		this.onClear();
	}

	onClear() {
		this.form.reset();
	}
}