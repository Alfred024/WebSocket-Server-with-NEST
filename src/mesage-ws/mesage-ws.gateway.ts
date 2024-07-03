import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MesageWsService } from './mesage-ws.service';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { MessageDto } from './dtos/message.dto';

@WebSocketGateway({ namespace: 'serverWS', cors: true})
export class MesageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss : Server;

  constructor(private readonly mesageWsService: MesageWsService) {}

  handleConnection( client: Socket ) {
    console.log(client.handshake.headers.authentication);

    this.mesageWsService.registerClient(client, client.id);
    this.wss.emit('clients-updated', this.mesageWsService.getConnectedCleints());
  }
  handleDisconnect( client: Socket ) {
    this.mesageWsService.removeClient(client.id);
  }

  @SubscribeMessage('client-message')
  handleClientMessage(client : Socket, payload : MessageDto){
    //! Emite únicamente al cliente.
    // client.emit('message-from-server', {
    //   fullName: 'Soy Yo!',
    //   message: payload.message || 'no-message!!'
    // });

    //! Emitir a todos MENOS, al cliente inicial
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy Yo!',
    //   message: payload.message || 'no-message!!'
    // });
    
    this.wss.emit('server-message', {
      fullName: payload.clientId,
      message: payload.message || 'no-message!!'
    });
  }
}
