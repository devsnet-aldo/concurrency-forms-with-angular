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
  updatable: any;

  constructor(
    protected socketService: SocketProviderConnect,
    private cookieService: CookieService
  ) {
    // Catch changes
    socketService.outEvent.subscribe(res => {
      if(res !== this.msg) {
        this.msg = res;
        this.updatable = res;
        if(this.e) {
          this.e.focus();
        }
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

  updateField = (content:any) => {
    this.msg = content.innerHTML;
    this.sendData('message');
  }

  e:any;
  e1:any;

  onCaret(cord: any) {
    if(cord.offset) {
      try {
        console.log("cord", cord.event.pageX, cord.event.pageY);
        

        if (cord.event.pageX && cord.event.pageY)
          this.e1 = document.elementFromPoint(cord.event.pageX, cord.event.pageY);

        let selection = document.getSelection();
        if( selection) {
          if( selection.anchorNode)
            this.e = selection.anchorNode.parentElement;
  
        }
        console.log(this.e, this.e1);  
      } catch (error) {
        console.log(error);
      }
      
    }
  }
}
