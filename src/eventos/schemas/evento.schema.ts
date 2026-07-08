import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Usuario } from '../../usuarios/schemas/usuario.schema';

export type EventoDocument = Evento & Document;

@Schema({ timestamps: true })
export class Evento {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  artista: string;

  @Prop({ required: true })
  fecha_evento: Date;

  @Prop({ required: true })
  lugar: string;

  @Prop()
  descripcion?: string;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true })
  image_url: string;

  @Prop({ required: true, min: 0 })
  precio: number;

  @Prop({ required: true, min: 1 })
  entradas_disponibles: number;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  creador_id: Usuario | Types.ObjectId;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
