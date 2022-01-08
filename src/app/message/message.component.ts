import { Component, Input, OnInit } from '@angular/core';
import { MessageType } from 'src/enums/MessageType';
import { Message } from 'src/models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message!: Message;
  
  // To be able to use the enum in the front page
  public messageType = MessageType;

  constructor() { }

  ngOnInit(): void {
  }

}
