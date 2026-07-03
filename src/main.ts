import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('API de Tickora')
    .setDescription('Documentación interactiva de los endpoints de Tickora')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  // Aquí definimos que Swagger vivirá en la ruta /api/docs
  SwaggerModule.setup('api/docs', app, document);

  // Habilitar CORS (super útil para cuando conectes tu frontend)
  app.enableCors();

  await app.listen(3000);
}
bootstrap();