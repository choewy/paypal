import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app';
import { DatabaseService } from '@/micro';
import {
  readFileSync,
  watchFile,
  writeFileSync,
  existsSync,
  mkdirSync,
} from 'fs';
import { createFileData, Format } from './helpers';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const runner = app.get(DatabaseService);

  const workSpacePath = process.cwd() + '/workspace';
  const queryPath = `${workSpacePath}/query.sql`;

  if (!existsSync(workSpacePath)) {
    mkdirSync(workSpacePath, { recursive: true });
    writeFileSync(
      queryPath,
      ['--FILENAME: output.json', '--FORMAT: json'].join('\n'),
      { encoding: 'utf-8' },
    );
  }

  watchFile(queryPath, { interval: 100 }, async () => {
    try {
      const query = readFileSync(queryPath).toString();
      const [filename, format, sql] = query.split('\n').reduce(
        (prev, str) => {
          if (str.startsWith('--FILENAME: ')) {
            prev[0] = str.replace('--FILENAME: ', '');

            return prev;
          }

          if (str.startsWith('--FORMAT:')) {
            const format = str.replace('--FORMAT:', '');
            if (format in Format) {
              prev[1] = format as Format;
            }

            return prev;
          }

          prev[2] += `\n${str}`;
          return prev;
        },
        ['output.json', Format.Json, ''],
      );

      if (sql) {
        const packets = await runner.runQuery(sql);
        writeFileSync(
          `${workSpacePath}/${filename}`,
          createFileData(format, packets),
          {
            encoding: 'utf-8',
          },
        );
      }
    } catch {}
  });
};

bootstrap();
