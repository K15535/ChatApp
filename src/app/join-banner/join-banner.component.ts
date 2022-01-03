import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatUser } from 'src/models/ChatUser';

const LOCAL_STORAGE_USERS_KEY = "users";

@Component({
  selector: 'app-join-banner',
  templateUrl: './join-banner.component.html',
  styleUrls: ['./join-banner.component.css']
})

export class JoinBannerComponent implements OnInit {
  usernameInput: string = '';
  currentChatUsersArray: ChatUser[];

  @Output() userAdded = new EventEmitter<ChatUser>();

  constructor() {
    // Chat users array is jsonified in the local storage
    this.currentChatUsersArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
  }

  ngOnInit(): void {
  }

  addUser() {
    if (this.currentChatUsersArray.find(chatUser => chatUser.username == this.usernameInput) != null)
    {
      alert("Username already exists !");
      return;
    }

    let newChatUser = new ChatUser(this.usernameInput);
    this.currentChatUsersArray.push(newChatUser)

    // Remove the existing chat users array from the local storage
    localStorage.removeItem(LOCAL_STORAGE_USERS_KEY);
    
    // Jsonify the chat users array in the localstorage
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(this.currentChatUsersArray));
    
    // Clear the textbox
    this.usernameInput = '';

    // The event is received by the root component in order to ping the chat-screen component that a new user has been created
    this.userAdded.emit(newChatUser);
  }
}
