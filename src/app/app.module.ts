import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 

import { SocketIoModule } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { SocketProviderConnect } from './services/web-socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SocketProviderConnect, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
