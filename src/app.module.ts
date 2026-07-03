import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EventosModule } from './eventos/eventos.module';
import { EntradasModule } from './entradas/entradas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://54.147.49.232:27017/TikoraDatabase'),
    UsuariosModule,
    EventosModule,
    EntradasModule,
  ],
})
export class AppModule {}
