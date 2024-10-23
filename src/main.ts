import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@/config/swagger.config';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo permite propiedades explícitamente definidas en el DTO
      forbidNonWhitelisted: true, // Lanza errores si se envían propiedades no definidas
      transform: true, // Transforma el objeto entrante a la instancia del tipo de la clase DTO
      dismissDefaultMessages: false, // Opcional: Muestra mensajes de error predeterminados
      validationError: { target: false },
      exceptionFactory: (errors) => {
        const errorMessages = errors.map((error) => ({
          field: error.property,
          error: Object.values(error.constraints)[0], // Asume que cada campo tiene al menos una validación
        }));
        return new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: errorMessages,
        });
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  // Setup Swagger
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
