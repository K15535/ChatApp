import { Component, ElementRef, Input, IterableChanges, IterableDiffer, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { ChatUser } from 'src/models/ChatUser';
import { Message } from 'src/models/Message';
import { MessageType } from 'src/enums/MessageType';
import { ChatUserService } from 'src/services/chat-user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  @ViewChild('scrollableContainer') private myScrollContainer!: ElementRef;

  public chatUsers: ChatUser[] = [];
  public messages: Message[] = [];
  public selectedUser: string = '';
  public chatMessageInput: string = '';

  // To watch changes on the chat users array
  private iterableDiffer : IterableDiffer<ChatUser>;

  constructor(private chatUserService: ChatUserService, private iterableDiffers: IterableDiffers, private sanitizer: DomSanitizer) {
    this.iterableDiffer = this.iterableDiffers.find([]).create<ChatUser>(undefined);
  }

  ngOnInit(): void {
    this.scrollToBottom();
    this.getChatUsers();
  }

  ngDoCheck(): void {
    let changes: IterableChanges<ChatUser> | null = this.iterableDiffer.diff(this.chatUsers);

    if (changes) {
      changes.forEachAddedItem(record => {
        this.selectedUser = record.item.username;
        this.messages.push(new Message(`${this.selectedUser} has joined the chat :D`, '', MessageType.System));
      });
      changes.forEachRemovedItem(record => {
        // If the deleted user was the last one or the current selected one
        if (this.chatUsers.length == 0 || record.item.username == this.selectedUser)
          this.selectedUser = '';

        this.messages.push(new Message(`${record.item.username} has left the chat :(`, '', MessageType.System));
      });
    }
 }

  ngAfterViewChecked(): void {        
    this.scrollToBottom();        
  }

  getChatUsers(): void {
    this.chatUserService.getChatUsers().subscribe(chatUsers => this.chatUsers = chatUsers);
  }

  selectUser(selectedChatUser: ChatUser): void {
    this.selectedUser = selectedChatUser.username;
  }

  disconnectUser(index: number): void {
    this.chatUserService.removeChatUser(index);
  }

  addChatMessage(): void {
    this.messages.push(new Message(this.chatMessageInput, this.selectedUser));

    this.chatMessageInput = '';
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch(err) { }                 
  }

  updateImage(event: any) {
    let imgURL: string = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[0])) as string;

    this.messages.push(new Message(imgURL, this.selectedUser, MessageType.Image));
  }
}