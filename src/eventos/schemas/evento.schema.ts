import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Usuario } from '../../usuarios/schemas/usuario.schema';

export type EventoDocument = Evento & Document;

@Schema({ timestamps: true })
export class Evento {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  artista: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  lugar: string;

  @Prop()
  descripcion?: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  organizador: Usuario | Types.ObjectId;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
