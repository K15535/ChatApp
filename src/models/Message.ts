import { formatDate } from "@angular/common";
import { MessageType } from "src/enums/MessageType";

export class Message {
    public content: string;
    public date: string;
    public emitter: string;
    public type: MessageType;

    constructor(content: string, emitter: string, type: MessageType = MessageType.User) {
        this.content = content;
        this.emitter = emitter;
        this.type = type;
        
        this.date = formatDate(Date.now(), "h:mm a", "en");
    }
}