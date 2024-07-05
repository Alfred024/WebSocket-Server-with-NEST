import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface Clients {
    [id : string] : {
        client : Socket,
        user : User
    };
};

@Injectable()
export class MesageWsService {

    private clients : Clients = {};

    constructor( 
        @InjectRepository(User)
        private readonly userRepository : Repository<User> ){}

    async registerClient( client : Socket, userId : string){
        if(this.isUserConnected(userId)){
            console.log('El usuario ya está conectado');
            
            client.disconnect();
            return;
        }

        const user = await this.userRepository.findOneBy({id: userId});
        if(!user) throw Error('Usuario no encontrado');
        if(!user.isActive) throw Error('Usuario no activo');

        this.clients[userId] = {
            client: client,
            user: user
        };
    }

    removeClient(userId : string){
        delete this.clients[userId];
    }

    getConnectedCleints() : string[]{
       return Object.keys(this.clients);
    }

    getUserFulllName(userId : string){
        return this.clients[userId].user.fullName;
    }

    private isUserConnected(userId : string) : boolean{
        for (const userIdRegistered of Object.keys(this.clients)) {
            console.log(userIdRegistered);
            if(userId == userIdRegistered){
                return true;
            }
        }   
        return false;
    }   
}
