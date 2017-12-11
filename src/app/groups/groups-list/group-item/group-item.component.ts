import { Component, Input } from '@angular/core';

import { Group } from '../../group.model';
import { GroupService } from '../../group.service';
import { Router } from '@angular/router/src/router';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html'
})
export class GroupItemComponent {
  	@Input()
  	public group: Group;

    constructor(private groupService: GroupService) {

    }

  	onDeleteGroup() {
    	this.groupService.deleteGroup(this.group._id)
      	.subscribe(() => {
        	this.groupService.groupDeleted.next(this.group._id);
    	});
	}
}
