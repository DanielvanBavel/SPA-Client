import { Comment } from '../comments/comment.model';

export class Post {
  public _id: string;
  public user_id: string;
  public username: string;
  public content: string;
  public time: number;
  public comments: Comment[];

  constructor(id: string,user_id: string, username: string, text: string, time: number, comments: Comment[]) {
    this._id = id || '';
    this.user_id = user_id || '';
    this.username = username || '';    
    this.content = text || '';
    this.time = time;
    this.comments = comments || [];
  }
}