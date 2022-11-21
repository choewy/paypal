import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../enums';
import { GoogleConfig } from '../types';

export default registerAs(ConfigKey.Google, (): GoogleConfig => {
  return {
    projectId: process.env.GOOGLE_PROJECT_ID,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
});
