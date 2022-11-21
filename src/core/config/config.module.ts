import { ConfigModule } from '@nestjs/config';
import { configs } from './configs';

export const ConfigCoreModule = ConfigModule.forRoot({
  isGlobal: true,
  load: configs,
});
