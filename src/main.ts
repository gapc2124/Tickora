import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // 1. Importamos Swagger
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 2. CONFIGURACIÓN DE SWAGGER 📝
  const config = new DocumentBuilder()
    .setTitle('Tickora API 🎟️')
    .setDescription('Documentación oficial de los endpoints para la red social Tickora')
    .setVersion('1.0')
    .addTag('usuarios')
    .addTag('eventos')
    .addTag('entradas')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  // Aquí definimos que la ruta para entrar sea '/api'
  SwaggerModule.setup('api', app, document); 

  await app.listen(3000);
}
bootstrap();