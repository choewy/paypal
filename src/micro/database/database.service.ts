import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  async runQuery(query: string): Promise<any> {
    return this.dataSource.query(query);
  }
}
