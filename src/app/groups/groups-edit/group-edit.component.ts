import { Component, ViewChild, OnInit, group } from '@angular/core';
import { BaseComponent } from '../../shared/basecomponent.class';
import { NgForm } from '@angular/forms';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms/src/model';
import { NgModel } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html'
})
export class GroupEditComponent extends BaseComponent implements OnInit {
	
	@ViewChild('f')
	public form: NgForm;
	private id: string;	
	private editMode = false;

	private editedItemIndex: string;
	private group: Group;

	constructor(private groupService: GroupService) {
		super();
	}

	ngOnInit() {
		this.subscription = this.groupService.startedEditing
		.subscribe(
		(index: string) => {	
			this.editedItemIndex = index;
			this.editMode = true;
			this.groupService.getGroup(index).subscribe((group) => {
				this.group = group;
				
				this.form.setValue({				
					name: group.name
				});
			});			
		});
	}

	onSubmit(form: NgForm) {
		const { id, name, posts } = form.value;
		const group = new Group(id, name, posts);
	
		group._id = this.id;

		if (this.editMode) {
			this.groupService.updateGroup(this.group._id, group).subscribe((response) => {				
				this.groupService.groupUpdated.next(response);					
			});
		} 
		else {
		  	this.groupService.addGroup(group).subscribe(() => {
				this.groupService.groupAdded.next(group);
			});	  
		}
		this.onClear();
	}

	onClear() {
		this.form.reset();
	}
}