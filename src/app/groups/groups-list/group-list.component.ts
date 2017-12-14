import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { BaseComponent } from '../../shared/basecomponent.class';

@Component({
	selector: 'app-group-list',
  	templateUrl: './group-list.component.html'
})

export class GroupListComponent extends BaseComponent implements OnInit {
  	public groups: Group[];

  	constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) {
    	super();
  	}

  ngOnInit() {
    this.subscription = this.groupService.groupsChanged
    	.subscribe((groups: Group[]) => {
        	this.groups = groups;
	  	});
	  
    this.groupService.getGroups()
      	.subscribe((response) => {
			this.groups = response;
	  	});
	  
    this.groupService.groupAdded
    	.subscribe((group) => {
        	this.groups.push(group);
	  	});
	  
    this.groupService.groupUpdated
      	.subscribe((group) => {
        	const index = this.groups.findIndex(x => x._id === group._id);
        	this.groups[index] = group;
		});
		
    this.groupService.groupDeleted
    	.subscribe((id) => {
        	const index = this.groups.findIndex(x => x._id === id);
        	this.groups.splice(index, 1);
      	});
  	}

  	onEditItem(group: Group) {
		this.groupService.startedEditing.next(group._id);		
		this.router.navigate([group._id], {relativeTo: this.route});
  	}
}