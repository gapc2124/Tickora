import { Document } from 'mongoose';
export type UsuarioDocument = Usuario & Document;
export declare class Usuario {
    nombre: string;
    apellidos: string;
    email: string;
    passwordHash: string;
    rol: string;
    isActive: boolean;
}
export declare const UsuarioSchema: import("mongoose").Schema<Usuario, import("mongoose").Model<Usuario, any, any, any, Document<unknown, any, Usuario, any, {}> & Usuario & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Usuario, Document<unknown, {}, import("mongoose").FlatRecord<Usuario>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Usuario> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
