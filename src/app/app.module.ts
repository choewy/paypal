import { Module } from '@nestjs/common';
import { CoreModule } from '@/core';
import { MicroModule } from '@/micro';

@Module({
  imports: [CoreModule, MicroModule],
})
export class AppModule {}
