import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as storage from 'node-persist';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundException, ValidationError } from '@nestjs/common';

async function bootstrap() {
  // Initialize storage and handle errors
  try {
    await storage.init();
    await storage.removeItem('history');
    console.log('Link history has been deleted.');
  } catch (error) {
    console.error('Failed to delete link history:', error);
  }

  const app = await NestFactory.create(AppModule);

  // Set a global route prefix /api for all API routes
  app.setGlobalPrefix('api');

  // Enable CORS with frontend origin and methods
  app.enableCors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Enable global validation using class-validator
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map(error => Object.values(error.constraints)).flat();
      throw new NotFoundException({ message: 'Validation failed', errors: messages });
    },
  }));

  // Handle unhandled exceptions
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  await app.listen(5000);
}

bootstrap();
