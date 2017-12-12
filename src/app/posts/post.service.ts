import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';

import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Post } from './post.model';
import { Comment } from '../comments/comment.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PostService {

	postAdded = new Subject<Post>();
	postUpdated = new Subject<Post>();	
	postDeleted = new Subject<string>();

	constructor(private http: Http) { }

	getPosts(): Observable<Post[]> {
		const url = `${environment.apiUrl}/posts`;
		return this.http.get(url, this.getRequestOptions())
		.map(r => r.json())
		.map((posts: Post[]) => {
			return posts.map(post => new Post(post._id, post.user_id, post.username, post.content, post.time, post.comments));
		});
	}

	getPost(id: string): Observable<Post> {
		const url = `${environment.apiUrl}/posts/${id}`;
		return this.http.get(url, this.getRequestOptions())
		.map(r => r.json())
		.map((post: Post) => {
			return new Post(post._id, post.user_id, post.username, post.content, post.time, post.comments);
		});
	}

	updatePost(id: string, post: Post): Observable<Post> {
		const url = `${environment.apiUrl}/posts/${id}`;
		const data = JSON.stringify(post);

		return this.http.put(url, data, this.getRequestOptions())
			.map(r => r.json())
			.map((post: Post) => {
				return new Post(post._id, post.user_id, post.username, post.content, post.time, post.comments);
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

	deletePost(id: string) {
		const url = `${environment.apiUrl}/posts/${id}`;
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
