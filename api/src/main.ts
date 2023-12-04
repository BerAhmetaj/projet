import { NestFactory } from '@nestjs/core';
import { AppModule } from './home/app.module';
import {HttpExceptionFilter} from '@common/config/exception';
import {swaggerConfiguration} from '@common/documentation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfiguration.config(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
