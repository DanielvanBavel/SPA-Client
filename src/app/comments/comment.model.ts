export class Comment {
    
    /**
     * The id of a user
     */
    public _id: string;
    
    /**
     * The username of a user
     */
    public username: string;
  
    /**
     * The comment under a post
     */
    public reply: string;


    /**
     * The time when a comment is placed
     */
    public time: number;
  
    constructor(id: string, username: string, reply: string, time: number) {
        this._id = id;
        this.username = username;
        this.reply = reply;
        this.time = time;
    }
}