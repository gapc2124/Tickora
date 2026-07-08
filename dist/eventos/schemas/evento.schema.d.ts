import { Document, Types } from 'mongoose';
import { Usuario } from '../../usuarios/schemas/usuario.schema';
export type EventoDocument = Evento & Document;
export declare class Evento {
    titulo: string;
    artista: string;
    fecha_evento: Date;
    lugar: string;
    descripcion?: string;
    categoria: string;
    image_url: string;
    precio: number;
    creador_id: Usuario | Types.ObjectId;
}
export declare const EventoSchema: import("mongoose").Schema<Evento, import("mongoose").Model<Evento, any, any, any, Document<unknown, any, Evento, any, {}> & Evento & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Evento, Document<unknown, {}, import("mongoose").FlatRecord<Evento>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Evento> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
