export class Comment {
    /**
     * The username of a user
     */
    public username: string;
  
    /**
     * The comment under a post
     */
    public content: string;


    /**
     * The time when a comment is placed
     */
    public time: Date;
  
    constructor(username: string, content: string, time: Date) {
        this.username = username;
        this.content = content;
        this.time = time;
    }
}