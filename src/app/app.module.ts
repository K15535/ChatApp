import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinBannerComponent } from './join-banner/join-banner.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    JoinBannerComponent,
    ChatScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTabsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
