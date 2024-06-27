import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MesageWsService } from './mesage-ws.service';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';

@WebSocketGateway({cors: true})
export class MesageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss : Server;

  constructor(private readonly mesageWsService: MesageWsService) {}

  handleDisconnect( client: Socket ) {
    this.mesageWsService.registerClient(client, client.id);
    this.wss.emit('clients-updated', this.mesageWsService.getConnectedCleints());
  }
  handleConnection( client: Socket ) {
    this.mesageWsService.removeClient(client.id);
  }
}
