import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() selectUser = new EventEmitter<ChatUser>();

  constructor(private chatUserService: ChatUserService) { }

  ngOnInit(): void {
  }

  selectUserClick(selectedChatUser: ChatUser): void {
    this.selectUser.emit(selectedChatUser);
  }

  disconnectUserClick(index: number): void {
    this.chatUserService.removeChatUser(index);
  }
}
