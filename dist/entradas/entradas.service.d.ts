import { Model } from 'mongoose';
import { Entrada, EntradaDocument } from './schemas/entrada.schema';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
export declare class EntradasService {
    private entradaModel;
    constructor(entradaModel: Model<EntradaDocument>);
    create(createEntradaDto: CreateEntradaDto): Promise<Entrada>;
    findAll(): Promise<Entrada[]>;
    findOne(id: string): Promise<Entrada>;
    update(id: string, updateEntradaDto: UpdateEntradaDto): Promise<Entrada>;
    remove(id: string): Promise<Entrada>;
}
