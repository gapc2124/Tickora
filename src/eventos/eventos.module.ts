import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Evento, EventoSchema } from './schemas/evento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }])
  ],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService],
})
export class EventosModule {}
