import { Component, ElementRef, Input, IterableChanges, IterableDiffer, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { ChatUser } from 'src/models/ChatUser';
import { Message } from 'src/models/Message';
import { MessageType } from 'src/enums/MessageType';
import { ChatUserService } from 'src/services/chat-user.service';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  @ViewChild('scrollableContainer') private myScrollContainer!: ElementRef;

  public chatUsers: ChatUser[] = [];
  public messages: Message[] = [];

  // To watch changes on a property
  private iterableDiffer : IterableDiffer<ChatUser>;

  constructor(private chatUserService: ChatUserService,
      private messageService: MessageService,
      private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this.iterableDiffers.find([]).create<ChatUser>(undefined);
  }

  ngOnInit(): void {
    this.scrollToBottom();
    this.getChatUsers();
    this.getMessages();
  }

  ngDoCheck(): void {
    let chatUsersArrayChanges: IterableChanges<ChatUser> | null = this.iterableDiffer.diff(this.chatUsers);

    if (chatUsersArrayChanges) {
      chatUsersArrayChanges.forEachAddedItem(record => {
        this.messageService.addMessage(new Message(`${record.item.username} has joined the chat :D`, '', MessageType.System));
      });
      chatUsersArrayChanges.forEachRemovedItem(record => {
        this.messageService.addMessage(new Message(`${record.item.username} has left the chat :(`, '', MessageType.System));
      });
    }
  }

  ngAfterViewChecked(): void {        
    this.scrollToBottom();        
  }

  getChatUsers(): void {
    this.chatUserService.getChatUsers().subscribe(chatUsers => this.chatUsers = chatUsers);
  }

  getMessages(): void {
    this.messageService.getMessages().subscribe(messages => this.messages = messages);
  }

  selectUser(username: string): void {
    this.chatUserService.selectChatUser(username);
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch(err) { }                 
  }
}