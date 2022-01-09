import { Component, Input, OnInit } from '@angular/core';
import { ChatUser } from 'src/models/ChatUser';
import { ChatUserService } from 'src/services/chat-user.service';

@Component({
  selector: 'app-chat-user-card',
  templateUrl: './chat-user-card.component.html',
  styleUrls: ['./chat-user-card.component.css']
})
export class ChatUserCardComponent implements OnInit {

  @Input() chatUser!: ChatUser;
  @Input() index!: number;

  public selectedUser: string = '';

  constructor(private chatUserService: ChatUserService) { }

  ngOnInit(): void {
    this.getSelectedUserChanges();
  }

  getSelectedUserChanges(): void {
    this.chatUserService.selectedUserChange.subscribe(user => this.selectedUser = user);
  }

  selectUserClick(selectedChatUser: ChatUser): void {
    this.chatUserService.selectChatUser(selectedChatUser.username);
  }

  disconnectUserClick(index: number): void {
    this.chatUserService.removeChatUser(index);
  }
}
