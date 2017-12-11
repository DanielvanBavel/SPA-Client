import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';

import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Post } from './post.model';
import { Comment } from '../shared/comment.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PostService {

	constructor(private http: Http) { }

	getPosts(): Observable<Post[]> {
		const url = `${environment.apiUrl}/posts`;
		return this.http.get(url, this.getRequestOptions())
		.map(r => r.json())
		.map((posts: Post[]) => {
			return posts.map(post => new Post(post._id, post.username, post.user_id, post.content, post.time, post.comments));
		});
	}

	getPost(id: string): Observable<Post> {
		const url = `${environment.apiUrl}/posts/${id}`;
		return this.http.get(url, this.getRequestOptions())
		.map(r => r.json())
		.map((post: Post) => {
			return new Post(post._id, post.username, post.user_id, post.content, post.time, post.comments);
		});
	}

	addPost(post: Post): Observable<Post> {
		const url = `${environment.apiUrl}/posts`;
		const data = JSON.stringify(post);
		return this.http.post(url, data, this.getRequestOptions())
		  .map(r => r.json())
		  .map((savedPost: Post) => {
			return new Post(savedPost._id, savedPost.user_id, savedPost.username, savedPost.content, savedPost.time, savedPost.comments);
		  });
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
