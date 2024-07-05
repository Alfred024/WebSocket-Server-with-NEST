import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MesageWsService } from './mesage-ws.service';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { MessageDto } from './dtos/message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ namespace: 'serverWS', cors: true})
export class MesageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss : Server;

  constructor(
    private readonly mesageWsService: MesageWsService, 
    private readonly jwtService : JwtService) {}

  async handleConnection( client: Socket ) {
        
    const token = client.handshake.headers.authentication as string;
    let payload : JwtPayload;
    payload = this.jwtService.verify(token);
    try {
      payload = this.jwtService.verify(token);
      await this.mesageWsService.registerClient(client, payload.id);
    } catch (error) { 
      client.disconnect();
      return;
    }
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
      fullName: this.mesageWsService.getUserFulllName(client.id),
      message: payload.message || 'no-message!!'
    });
  }
}
