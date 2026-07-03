import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  avatar_url?: string;

  @Prop()
  biografia?: string;

  @Prop({ enum: ['usuario', 'organizador', 'admin'], default: 'usuario' })
  rol: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
