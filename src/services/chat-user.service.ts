import { Injectable } from '@angular/core';
import { ChatUser } from 'src/models/ChatUser';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatUserService {

  private chatUsers : ChatUser[] = [];

  constructor() { }

  addChatUser(chatUser: ChatUser): void {
    this.chatUsers.push(chatUser);
  }

  removeChatUser(index: number): void {
    this.chatUsers.splice(index, 1);
  }

  getChatUsers(): Observable<ChatUser[]> {
    return of(this.chatUsers);
  }
}
