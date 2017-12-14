import { Post } from '../posts/post.model';

export class Group {

    public _id : string;
    public name: string;
    public posts: Post[]

    constructor(id: string, name: string, posts: Post[]) {
        this._id = id || '';
        this.name = name || '';
        this.posts = posts;
    }
}