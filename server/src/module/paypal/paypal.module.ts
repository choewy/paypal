import { Module, forwardRef } from '@nestjs/common';
import { CoreModule } from '../core';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';

@Module({
  imports: [forwardRef(() => CoreModule)],
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PaypalModule {}
