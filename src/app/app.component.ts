import { Component, Injectable, OnInit } from '@angular/core';
import { SocketProviderConnect } from './services/web-socket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Concurrency-Forms-With-Angular';
  user:any;
  user_id:any;
  msg:any;

  constructor(
    protected socketService: SocketProviderConnect,
    private cookieService: CookieService
  ) {
    // Catch changes
    socketService.outEvent.subscribe(res => {
      if(res !== this.msg) {
        this.msg = res;
      }
    });
  }

  ngOnInit() {
    try{
      this.msg = JSON.parse(this.cookieService.get('message'));
    }catch(e){
      this.msg = null
    }
 
  }

  mockedUser = () => {
    this.cookieService.set('user',JSON.stringify({
      user:this.user ,
      id:this.user_id
    }));

    window.location.reload();
  }

  sendData = (event: any) => {
    this.socketService.emitEvent(event, {
      message: this.msg
    });
  }
}
