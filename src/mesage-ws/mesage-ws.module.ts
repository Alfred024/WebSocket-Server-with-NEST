import { Module } from '@nestjs/common';
import { MesageWsService } from './mesage-ws.service';
import { MesageWsGateway } from './mesage-ws.gateway';

@Module({
  providers: [MesageWsGateway, MesageWsService]
})
export class MesageWsModule {}
