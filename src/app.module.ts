import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EventosModule } from './eventos/eventos.module';
import { EntradasModule } from './entradas/entradas.module';

@Module({
  imports: [
    // 1. Carga el archivo .env de forma global
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. CAMBIO CLAVE: Inyectamos ConfigService para asegurar la carga
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
    }),
    
    UsuariosModule,
    EventosModule,
    EntradasModule,
  ],
})
export class AppModule {}