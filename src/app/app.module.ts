import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinBannerComponent } from './join-banner/join-banner.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { MessageComponent } from './message/message.component';
import { ChatUserCardComponent } from './chat-user-card/chat-user-card.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    JoinBannerComponent,
    ChatScreenComponent,
    MessageComponent,
    ChatUserCardComponent,
    ChatFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTabsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
