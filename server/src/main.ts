import { Bootstrap } from '@/bootstrap';
import { AppModule } from '@/app';

const main = async () => {
  const bootstrap = new Bootstrap();
  await bootstrap.create(AppModule);
  await bootstrap.listen();
};

main();
