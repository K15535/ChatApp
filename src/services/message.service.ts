import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from 'src/models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages : Message[] = [];

  constructor() { }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  getMessages(): Observable<Message[]> {
    return of(this.messages);
  }
}
