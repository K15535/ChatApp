export class Message {
    public content: string;
    public date: string;
    public emitter: string;

    constructor(content: string, date: string, emitter: string) {
        this.content = content;
        this.date = date;
        this.emitter = emitter;
    }
}