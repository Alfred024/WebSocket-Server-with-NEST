import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface Clients {
    [id : string] : Socket;
};

@Injectable()
export class MesageWsService {

    private clients : Clients = {};

    registerClient( client : Socket, clientID : string){
        this.clients[client.id] = client;
    }

    removeClient(clientID : string){
        delete this.clients[clientID];
    }

    getConnectedCleints() : string[]{
       return Object.keys(this.clients);
    }
}
