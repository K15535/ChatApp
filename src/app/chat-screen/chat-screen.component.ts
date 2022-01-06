import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { ChatUser } from 'src/models/ChatUser';
import { Message } from 'src/models/Message';

import { LOCAL_STORAGE_USERS_KEY } from '../app.component';
import { LOCAL_STORAGE_MESSAGES_KEY } from '../app.component';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  @ViewChild('scrollableContainer') private myScrollContainer!: ElementRef;
  @Input() newChatUser: ChatUser | undefined;

  chatUsers : ChatUser[];
  messages : Message[];
  selectedUser : string;
  chatMessageInput: string = '';

  constructor() {
    this.chatUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
    this.messages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY) || '[]');
    this.selectedUser = this.chatUsers.length > 0 ? this.chatUsers[0].username : '';
  }

  ngOnInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  ngOnChanges(changes: SimpleChanges) {
    console.log("previous value : " + changes['newChatUser'].previousValue?.username);
    console.log("current value : " + changes['newChatUser'].currentValue?.username);

    if (changes['newChatUser'].currentValue != undefined)
      this.addNewChatUserTab(changes['newChatUser'].currentValue);
  }

  addNewChatUserTab(newChatUser: ChatUser) {
    this.chatUsers.push(newChatUser);
    this.selectedUser = newChatUser.username;
  }

  chatUserClicked(selectedChatUser: ChatUser) {
    this.selectedUser = selectedChatUser.username;
  }

  addChatMessage() {
    if (this.chatMessageInput.length == 0)
      return;
    
    let message = new Message(this.chatMessageInput, formatDate(Date.now(), "h:mm a", "en"), this.selectedUser);

    this.messages.push(message);

    // Remove the existing messages array from the local storage
    localStorage.removeItem(LOCAL_STORAGE_MESSAGES_KEY);

    // Jsonify the messages array in the localstorage
    localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(this.messages));

    this.chatMessageInput = '';
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
}