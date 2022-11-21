import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { existsSync, readFileSync } from 'fs';
import { ConfigKey } from '../enums';
import { DateTime } from 'luxon';
import { TypeOrmConfig } from '../types';

export default registerAs(ConfigKey.TypeOrm, (): TypeOrmConfig => {
  const caPath = process.env.TYPEORM_CA_PATH;

  return {
    type: process.env.TYPEORM_TYPE as any,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: [process.cwd() + process.env.TYPEORM_ENTITIES],
    migrations: [process.cwd() + process.env.TYPEORM_MIGRATIONS],
    timezone: process.env.TYPEORM_TIMEZONE,
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
    ssl:
      caPath && existsSync(process.cwd() + caPath)
        ? {
            require: true,
            rejectUnauthorized: true,
            ca: readFileSync(process.cwd() + caPath).toString(),
          }
        : undefined,
    extra: {
      typeCast: (field, next) => {
        const { type } = field;

        if (type === 'DATE') {
          const val = field.string();

          return val === null
            ? null
            : DateTime.fromFormat(val.slice(0, 10), 'yyyy-MM-dd');
        } else if (type === 'DATETIME') {
          const val = field.string();
          return val === null
            ? null
            : DateTime.fromFormat(val.slice(0, 19), 'yyyy-MM-dd HH:mm:ss');
        } else {
          return next();
        }
      },
    },
  };
});
