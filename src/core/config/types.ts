import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type ServerConfig = {
  host: string;
  port: number;
};

export type GoogleConfig = {
  projectId: string;
  clientId: string;
  clientSecret: string;
};

export type TypeOrmConfig = TypeOrmModuleOptions;
