import { Component } from '@angular/core';
import { ChatUser } from 'src/models/ChatUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  newChatUser: ChatUser | undefined;

  title = 'ChatApp';

  onUserAdded(newChatUser: ChatUser) {
    this.newChatUser = newChatUser;
    //alert("added " + chatUser.username);
  }
}
