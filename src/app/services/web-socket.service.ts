import { Injectable, EventEmitter, Output } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class SocketProviderConnect extends Socket {

  @Output() outEvent: EventEmitter<any> = new EventEmitter(); 

  constructor(private cookieService: CookieService) { 
    super({
      url: environment.serverSocket,
      options: {
        query: {
          payload: cookieService.get('user')
        }
      }
    });
    console.log(environment.serverSocket);
    this.ioSocket.on('message', (res: any) => this.outEvent.emit(res));
  }

  emitEvent = (event = 'default', payload = {}) => {
    this.ioSocket.emit(event, {
      event,
      payload
    }); 
  }
}
