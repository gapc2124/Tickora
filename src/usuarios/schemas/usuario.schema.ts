import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  apellidos: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string; // En un entorno real debe ir hasheada (e.g. bcrypt)

  @Prop({ default: 'user', enum: ['user', 'admin', 'organizer'] })
  rol: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
