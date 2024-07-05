import { Module } from '@nestjs/common';
import { MesageWsService } from './mesage-ws.service';
import { MesageWsGateway } from './mesage-ws.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MesageWsGateway, MesageWsService],
  imports: [ AuthModule ],
})
export class MesageWsModule {}
