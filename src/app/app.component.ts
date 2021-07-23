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
        console.log('outsvc', this.e, this._cord);
        if(this.e && this._cord) {
          let offset = this._cord.offset;
          const range = document.createRange();
          range.setStart(this._node, offset);
          range.setEnd(this._node, offset);
          console.log('changed', offset, range, this._sel);
          this._sel.removeAllRanges();
          this._sel.addRange(range);
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
  _cord:any;
  _node: any;
  _sel: any;

  onCaret(cord: any) {
    this._cord = cord;
    if(cord.offset) {
      try {
        console.log("cord", cord.event.pageX, cord.event.pageY);
        

        if (cord.event.pageX && cord.event.pageY)
          this.e1 = document.elementFromPoint(cord.event.pageX, cord.event.pageY);

        this._sel = document.getSelection();
        if( this._sel) {
          if( this._sel.anchorNode) {
            this._node = this._sel.anchorNode;
            this.e = this._node.parentElement;
          }
  
        }
        console.log('-->', this.e, this.e1);  
      } catch (error) {
        console.log(error);
      }
      
    }
  }
}
