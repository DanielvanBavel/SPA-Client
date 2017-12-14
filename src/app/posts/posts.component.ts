import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from './post.model';
import { BaseComponent } from '../shared/basecomponent.class';
import { User } from '../user/user.model';
import { DatePipe } from '@angular/common';
import { GroupService } from '../groups/group.service';
import { Group } from '../groups/group.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./post.component.css'],
  providers: [GroupService]
})

export class PostsComponent extends BaseComponent implements OnInit {

    @ViewChild('f')
	public form: NgForm;
    private id: string;

    private groupId: string;

    @Input()
    private postId: string;

    private groupObject: Group;
    public groups: Group[];
    private editMode = false;  
    public posts: Post[];

    constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.groupService.getGroups().subscribe((response) => {
			this.groups = response
        });

        this.subscription = this.route.params.subscribe((params: Params) => {
            this.groupId = params['id'];

            this.groupService.getGroup(this.groupId).subscribe((response) => {
                this.posts = response.posts;
            });

            this.groupService.groupUpdated.subscribe((group) => {
                this.groups.forEach(item => {
                    item.posts.forEach(newItem => {
                        const postObjectId = newItem._id;
                        const index = item.posts.findIndex(x => x._id === postObjectId);
                        if(index === -1) {
                            this.groups.push(item);                  
                        }
                        else {
                            //
                        }
                    });
                });            
            });
        });
        
        
    }

    onSubmit(form: NgForm) {
        if(this.editMode) {
            // edit
        }  
        else {
            const { id, user_id, username, content, time, comments } = form.value;
            const post = new Post(id, '5a2550ca5179b81be0241339', 'henkie', content, Date.now(), []);        
            post._id = this.id;


            const currentGroup = this.groupService.getGroup(this.groupId).subscribe((response) => {
                this.groupObject = response;

                this.groupObject.posts.push(post);
                
                this.groupService.updateGroup(this.groupId, this.groupObject).subscribe((response) => {
                    this.groupService.groupUpdated.next(response);
                });
            });
        }
        this.onClear();       
    }

    onClear() {
		this.form.reset();
    }
    
    onDeletePost(id) {
        this.groupService.getGroup(this.groupId).subscribe((response) => {
            this.groupObject = response;
            
            this.groupObject.posts.forEach(item => {
                if(item._id === id) {
                    const index = this.groupObject.posts.findIndex(x => x._id === id);
                    this.groupObject.posts.splice(index, 1);
                }
            });

            this.groupService.updateGroup(this.groupId, this.groupObject).subscribe((response) => {
                this.groupService.groupUpdated.next(response);
            });
        });
    }

    onDeleteComment(postId, commentId) {

		const currentPost =  this.groupService.getGroup(this.groupId).subscribe((response) => {
            this.groupObject = response;
            
            this.groupObject.posts.forEach(item => {
                if(item._id === postId ) {
                    const index = item.comments.findIndex(x => x._id === commentId);
                    item.comments.splice(index, 1);
                }
            });

            this.groupService.updateGroup(this.groupId, this.groupObject).subscribe((response) => {
                this.groupService.groupUpdated.next(response);
            });
		});
    }
}