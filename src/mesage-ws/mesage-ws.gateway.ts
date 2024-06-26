import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { MesageWsService } from './mesage-ws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({cors: true})
export class MesageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly mesageWsService: MesageWsService) {}
  handleDisconnect(client: Socket) {
    throw new Error('Method not implemented.');
  }
  handleConnection(client: Socket, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
}
