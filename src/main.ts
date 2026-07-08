import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // 1. Importamos Swagger
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Indispensable para que el frontend pueda consultar los eventos

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

  // Añadimos '0.0.0.0' para que el servidor acepte peticiones desde redes externas (EC2)
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();