import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';

import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Group } from './group.model';
import { environment } from '../../environments/environment';
import { Post } from '../posts/post.model';

@Injectable()
export class GroupService {

	groupsChanged = new Subject<Group[]>();
	groupAdded = new Subject<Group>();
	groupUpdated = new Subject<Group>();
	groupDeleted = new Subject<string>();
	showPost = new Subject<Post[]>();
	postUpdated = new Subject<Post>();


	startedEditing = new Subject<string>();

	constructor(private http: Http) { }

	getGroups(): Observable<Group[]> {
		const url = `${environment.apiUrl}/groups`;
		return this.http.get(url, this.getRequestOptions())
		.map(r => r.json())
		.map((groups: Group[]) => {
			return groups.map(group => new Group(group._id, group.name, group.posts));
		});
    }
    
    getGroup(id: string): Observable<Group> {
		const url = `${environment.apiUrl}/groups/${id}`;
		return this.http.get(url, this.getRequestOptions())
		.map(r => r.json())
		.map((group: Group) => {
			return new Group(group._id, group.name, group.posts);
		});
	}

	addGroup(group: Group): Observable<Group> {
		const url = `${environment.apiUrl}/groups`;
		const data = JSON.stringify(group);
		return this.http.post(url, data, this.getRequestOptions())
		  .map(r => r.json())
		  .map((group: Group) => {
			return new Group(group._id, group.name, group.posts);
		});
	}

	updateGroup(id: string, group: Group): Observable<Group> {
		const url = `${environment.apiUrl}/groups/${id}`;
		const data = JSON.stringify(group);
		return this.http.put(url, data, this.getRequestOptions())
			.map(r => r.json())
			.map((group: Group) => {
				return new Group(group._id, group.name, group.posts);
		});
	}
	
	deleteGroup(id: string) {
		const url = `${environment.apiUrl}/groups/${id}`;
		return this.http.delete(url, this.getRequestOptions())
			.map(r => r.json());
	}

	private getRequestOptions(): RequestOptionsArgs {
		const headers = new Headers({
		'Content-Type': 'application/json'
		});

		return {
			headers: headers
		};
	}
}
