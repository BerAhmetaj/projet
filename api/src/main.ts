import {NestFactory} from '@nestjs/core';
import {AppModule} from './home';
import {swaggerConfiguration} from '@common/documentation';
import {Logger, ValidationError, ValidationPipe} from '@nestjs/common';
//import {ValidationException} from '@common/api';
import {ApiInterceptor} from '@common/api/api.interceptor';
import {configManager} from '@common/config/config.manager';
import {ConfigKey} from '@common/config/enum';
import {HttpExceptionFilter} from '@common/config/exception';
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  // Allow requests from all origins
  app.enableCors();
  app.setGlobalPrefix(configManager.getValue(ConfigKey.APP_BASE_URL));
  swaggerConfiguration.config(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ApiInterceptor());
  /*app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => new
    ValidationException(validationErrors)
  }));*/
  await app.listen(parseInt(configManager.getValue(ConfigKey.APP_PORT), 10));
}
bootstrap().then(() =>{
  const logger = new Logger('Main Logger');
  logger.log('Server is started !!')
});
