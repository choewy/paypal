import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../enums';
import { ServerConfig } from '../types';

export default registerAs(ConfigKey.Server, (): ServerConfig => {
  return {
    host: process.env.SERVER_HOST,
    port: parseInt(process.env.SERVER_PORT, 10),
  };
});
