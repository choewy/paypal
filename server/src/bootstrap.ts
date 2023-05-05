import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { ConfigKey, ServeConfig } from '@/configs';

export class Bootstrap {
  private app: NestApplication;
  private configService: ConfigService;
  private config: ServeConfig;

  async create(m: any): Promise<void> {
    this.app = await NestFactory.create(m);
    this.configService = this.app.get(ConfigService);
    this.config = this.configService.getOrThrow<ServeConfig>(ConfigKey.SERVE);
  }

  async listen(): Promise<void> {
    this.app.listen(this.config.port);
  }
}
