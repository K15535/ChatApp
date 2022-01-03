import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatUser } from 'src/models/ChatUser';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  @Input() newChatUser: ChatUser | undefined;

  tabs = ['First', 'Second', 'Third']; // tmp
  selected = new FormControl(0);

  constructor() { }

  ngOnInit(): void {
    // TODO : Check local storage to find existing users and messages
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("previous value : " + changes['newChatUser'].previousValue?.username);
    console.log("current value : " + changes['newChatUser'].currentValue?.username);
  }

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }
}