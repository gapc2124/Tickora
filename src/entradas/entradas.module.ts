import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntradasService } from './entradas.service';
import { EntradasController } from './entradas.controller';
import { Entrada, EntradaSchema } from './schemas/entrada.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Entrada.name, schema: EntradaSchema }])
  ],
  controllers: [EntradasController],
  providers: [EntradasService],
  exports: [EntradasService],
})
export class EntradasModule {}
