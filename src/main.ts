import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Подключим движок шаблонизатора
  app.setViewEngine('hbs');

  // Выберем папку с представлениями
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Папка для статики (CSS, изображения и т.п.)
  app.useStaticAssets(join(__dirname, '..', 'public'));


  // Регистрация partials
  hbs.registerPartials(join(__dirname, '..', 'views/_partials'));

  // Отключить кэш, чтобы изменения применялись сразу:
  app.set('view cache', false);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
