import { Comment } from '../shared/comment.model';

export class Post {
  public _id: string;
  public username: string;
  public user_id: string;
  public content: string;
  public time: Date;
  public comments: Comment[];

  constructor(id: string, username: string, user_id: string, text: string, time: Date, comments: Comment[]) {
    this._id = id || '';
    this.username = username || '';
    this.user_id = user_id || '';
    this.content = text || '';
    this.time = time;
    this.comments = comments || [];
  }
}