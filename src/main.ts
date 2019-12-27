import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);

  /** Enable Hot-Module Replacement */
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
