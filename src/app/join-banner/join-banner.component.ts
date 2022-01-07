import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatUser } from 'src/models/ChatUser';
import { ChatUserService } from 'src/services/chat-user.service';

@Component({
  selector: 'app-join-banner',
  templateUrl: './join-banner.component.html',
  styleUrls: ['./join-banner.component.css']
})

export class JoinBannerComponent implements OnInit {
  public usernameInput: string = '';
  
  private currentChatUsersArray: ChatUser[] = [];

  constructor(private chatUserService: ChatUserService) { }

  ngOnInit(): void {
    this.getChatUsers();
  }

  getChatUsers(): void {
    this.chatUserService.getChatUsers().subscribe(chatUsers => this.currentChatUsersArray = chatUsers);
  }

  addUser(): void {
    if (this.currentChatUsersArray.find(chatUser => chatUser.username == this.usernameInput) != null)
    {
      alert("Username already exists !");
      return;
    }

    this.chatUserService.addChatUser(new ChatUser(this.usernameInput));

    this.usernameInput = '';
  }
}
