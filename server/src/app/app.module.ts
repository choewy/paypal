import { Module } from '@nestjs/common';

import { CoreModule, PaypalModule } from '@/modules';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [CoreModule, PaypalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
