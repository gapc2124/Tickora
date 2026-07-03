import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Usuario } from '../../usuarios/schemas/usuario.schema';
import { Evento } from '../../eventos/schemas/evento.schema';

export type EntradaDocument = Entrada & Document;

@Schema({ timestamps: true })
export class Entrada {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  comprador: Usuario | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Evento', required: true })
  evento: Evento | Types.ObjectId;

  @Prop({ required: true })
  zona: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ enum: ['valida', 'usada'], default: 'valida' })
  estado: string;

  @Prop({ required: true, unique: true })
  codigo_qr: string;
}

export const EntradaSchema = SchemaFactory.createForClass(Entrada);
