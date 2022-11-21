import { Global, Module } from '@nestjs/common';
import { ConfigCoreModule } from './config';
import { TypeOrmCoreModule } from './typeorm';

@Global()
@Module({
  imports: [ConfigCoreModule, TypeOrmCoreModule],
})
export class CoreModule {}
