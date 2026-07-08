import { Document, Types } from 'mongoose';
import { Usuario } from '../../usuarios/schemas/usuario.schema';
import { Evento } from '../../eventos/schemas/evento.schema';
export type EntradaDocument = Entrada & Document;
export declare class Entrada {
    comprador: Usuario | Types.ObjectId;
    evento: Evento | Types.ObjectId;
    zona: string;
    precio: number;
    estado: string;
    codigo_qr: string;
}
export declare const EntradaSchema: import("mongoose").Schema<Entrada, import("mongoose").Model<Entrada, any, any, any, Document<unknown, any, Entrada, any, {}> & Entrada & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Entrada, Document<unknown, {}, import("mongoose").FlatRecord<Entrada>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Entrada> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
