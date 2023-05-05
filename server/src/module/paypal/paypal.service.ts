import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigKey, PaypalConfig } from '@/configs';

@Injectable()
export class PaypalService {
  private readonly config: PaypalConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.getOrThrow<PaypalConfig>(ConfigKey.PAYPAL);
  }
}
