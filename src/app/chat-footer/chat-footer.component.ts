import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageType } from 'src/enums/MessageType';
import { Message } from 'src/models/Message';
import { ChatUserService } from 'src/services/chat-user.service';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.css']
})
export class ChatFooterComponent implements OnInit {
  public chatMessageInput: string = '';
  public selectedUser: string = '';

  constructor(private chatUserService: ChatUserService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getSelectedUserChanges();
  }

  getSelectedUserChanges(): void {
    this.chatUserService.selectedUserChange.subscribe(user => this.selectedUser = user);
  }

  addChatMessage(): void {
    this.messageService.addMessage(new Message(this.chatMessageInput, this.selectedUser));

    this.chatMessageInput = '';
  }

  selectImage(event: any): void {
    let imgURL: string = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[0])) as string;

    this.messageService.addMessage(new Message(imgURL, this.selectedUser, MessageType.Image));
  }
}
