import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 

import { CookieService } from 'ngx-cookie-service';
import { SocketProviderConnect } from './services/web-socket.service';
import { ContentEditableDirective } from './directives/content-editable.directive';
import { CaretTrackerDirective } from './directives/caret-tracker.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContentEditableDirective,
    CaretTrackerDirective
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
