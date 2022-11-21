import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig, ConfigKey } from '../config';

export const TypeOrmCoreModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    return configService.get<TypeOrmConfig>(ConfigKey.TypeOrm);
  },
});
