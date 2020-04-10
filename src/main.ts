import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as helmet from 'helmet';

declare const module: any;

const PORT = process.env.PORT || 3000;
const SWAGGER_URL = 'api-doc';

/** Swagger configuration, setting properties such as title, version, etc. */
const options = new DocumentBuilder()
  .setTitle('Odyssey Shop API')
  .setDescription('The API description for Odyssey Shop')
  .setVersion('0.1')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.CLIENT_ORIGIN },
  });

  const document = SwaggerModule.createDocument(app, options);
  /**  Initialize Swagger with the path to Swagger document */
  SwaggerModule.setup(SWAGGER_URL, app, document);

  app.use(helmet());

  await app.listen(PORT);

  /** Enable Hot-Module Replacement */
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
