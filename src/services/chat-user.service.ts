import { Injectable } from '@angular/core';
import { ChatUser } from 'src/models/ChatUser';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatUserService {

  private chatUsers : ChatUser[] = [];
  public selectedUser: string = '';

  selectedUserChange: Subject<string> = new Subject<string>();

  constructor() {
    this.selectedUserChange.subscribe((value) => {
      this.selectedUser = value;
    });
  }

  addChatUser(chatUser: ChatUser): void {
    this.selectChatUser(chatUser.username);

    this.chatUsers.push(chatUser);
  }

  removeChatUser(index: number): void {
    // If the deleted user was the last one or the current selected one
    if (this.chatUsers.length == 0 || this.chatUsers[index].username == this.selectedUser)
      this.selectChatUser('');
    
    this.chatUsers.splice(index, 1);
  }

  getChatUsers(): Observable<ChatUser[]> {
    return of(this.chatUsers);
  }

  selectChatUser(username: string): void {
    this.selectedUserChange.next(username);
  }
}
